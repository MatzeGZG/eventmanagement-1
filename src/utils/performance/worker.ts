```typescript
const ctx: Worker = self as any;

ctx.addEventListener('message', async (event) => {
  try {
    const result = await event.data.task();
    ctx.postMessage({ type: 'success', result });
  } catch (error) {
    ctx.postMessage({ type: 'error', error: error.message });
  }
});

export {};
```