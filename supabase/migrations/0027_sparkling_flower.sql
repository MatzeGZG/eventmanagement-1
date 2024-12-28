-- RLS Policies for Surveys
CREATE POLICY "Public read access for surveys"
  ON surveys FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Event organizers can create surveys"
  ON surveys FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND organizer_id = auth.uid()
    )
  );

CREATE POLICY "Event organizers can update surveys"
  ON surveys FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND organizer_id = auth.uid()
    )
  );

CREATE POLICY "Event organizers can delete surveys"
  ON surveys FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND organizer_id = auth.uid()
    )
  );

-- RLS Policies for Survey Questions
CREATE POLICY "Public read access for survey questions"
  ON survey_questions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Event organizers can manage survey questions"
  ON survey_questions FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      JOIN events e ON s.event_id = e.id
      WHERE survey_questions.survey_id = s.id
      AND e.organizer_id = auth.uid()
    )
  );

-- RLS Policies for Survey Responses
CREATE POLICY "Users can view their own responses"
  ON survey_responses FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can submit responses"
  ON survey_responses FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_id
      AND now() BETWEEN s.start_date AND COALESCE(s.end_date, 'infinity'::timestamptz)
      AND (
        s.allow_multiple_responses = true
        OR NOT EXISTS (
          SELECT 1 FROM survey_responses sr
          WHERE sr.survey_id = survey_id
          AND sr.user_id = auth.uid()
        )
      )
    )
  );

-- RLS Policies for Polls
CREATE POLICY "Public read access for active polls"
  ON polls FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Event organizers can manage polls"
  ON polls FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND organizer_id = auth.uid()
    )
  );

-- RLS Policies for Poll Votes
CREATE POLICY "Users can view poll results"
  ON poll_votes FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can submit votes"
  ON poll_votes FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM polls p
      WHERE p.id = poll_id
      AND p.is_active = true
      AND (
        p.allow_multiple_votes = true
        OR NOT EXISTS (
          SELECT 1 FROM poll_votes pv
          WHERE pv.poll_id = poll_id
          AND pv.user_id = auth.uid()
        )
      )
    )
  );