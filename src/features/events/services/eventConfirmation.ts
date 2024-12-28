```typescript
import { Event } from '../../../types/event';
import { generateWalletPass } from '../utils/walletPass';
import { generateQRCode } from '../utils/qrCode';
import { supabase } from '../../../lib/supabase';

export class EventConfirmationService {
  static async sendConfirmationEmail(userId: string, event: Event) {
    const { data: user } = await supabase.auth.getUser();
    if (!user) throw new Error('User not found');

    const qrCode = await generateQRCode(event.id, userId);
    const walletPass = await generateWalletPass(event, userId);

    const emailContent = `
      <h1>Event Confirmation: ${event.title}</h1>
      <p>Thank you for registering for ${event.title}!</p>
      
      <h2>Event Details</h2>
      <p>Date: ${event.date.toLocaleString()}</p>
      <p>Location: ${event.location.address}</p>
      
      <div>
        <a href="/events/${event.id}">View Event Details</a>
      </div>
      
      <div>
        <a href="/calendar">View in Calendar</a>
      </div>
      
      <div>
        <a href="${walletPass}">Add to Wallet</a>
      </div>
    `;

    // Send email using Supabase Edge Functions
    await fetch(`${supabase.supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: user.user.email,
        subject: `Event Confirmation: ${event.title}`,
        html: emailContent,
        attachments: [
          {
            filename: 'ticket.pkpass',
            content: walletPass
          }
        ]
      })
    });
  }

  static async addToCalendar(event: Event) {
    const { data: user } = await supabase.auth.getUser();
    if (!user) throw new Error('User not found');

    await supabase.from('calendar_events').insert({
      event_id: event.id,
      user_id: user.user.id,
      title: event.title,
      description: event.description,
      start_date: event.date,
      location: event.location
    });
  }
}
```