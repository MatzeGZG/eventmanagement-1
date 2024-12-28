export const logEventCounts = (events: any[]) => {
  // City breakdown
  const eventsByCity = events.reduce((acc, event) => {
    const city = event.location.city;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  // Date breakdown
  const eventsByDate = events.reduce((acc, event) => {
    const date = new Date(event.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Category breakdown
  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Log results
  console.log('\nEvent Analysis:');
  console.log('---------------');
  
  console.log('\nEvents by City:');
  Object.entries(eventsByCity).forEach(([city, count]) => {
    console.log(`${city}: ${count} events`);
  });

  console.log('\nEvents by Date:');
  Object.entries(eventsByDate).forEach(([date, count]) => {
    console.log(`${date}: ${count} events`);
  });

  console.log('\nEvents by Category:');
  Object.entries(eventsByCategory).forEach(([category, count]) => {
    console.log(`${category}: ${count} events`);
  });

  console.log(`\nTotal Events: ${events.length}`);
  
  // Price analysis
  const pricedEvents = events.filter(e => e.price > 0);
  if (pricedEvents.length > 0) {
    const avgPrice = pricedEvents.reduce((sum, e) => sum + e.price, 0) / pricedEvents.length;
    console.log(`\nAverage Event Price: $${avgPrice.toFixed(2)}`);
  }
};