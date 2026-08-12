export default {
  async fetch(request, env) {
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('ASSETS binding missing', { status: 500 });
  },
};
