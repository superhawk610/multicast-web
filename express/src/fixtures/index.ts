const init = async () => {
  const {
    default: channels,
  } = ((await import('./channels.fixture')) as unknown) as any;
  const {
    default: devices,
  } = ((await import('./devices.fixture')) as unknown) as any;
  const {
    default: hosts,
  } = ((await import('./hosts.fixture')) as unknown) as any;

  const fixtures = [channels, hosts, devices];

  fixtures.forEach(models => {
    models.forEach((model: any) => {
      model.save();
    });
  });
};

export default init;
