import { Model } from 'sequelize-typescript';

const init = async () => {
  // We have to dynamically import Models because they
  // depend on Sequelize's connection being established
  // to properly instantiate.
  const { default: channels } = await import('./channels.fixture');
  const { default: devices } = await import('./devices.fixture');
  const { default: hosts } = await import('./hosts.fixture');

  const fixtures: Array<Array<Model<any>>> = [channels, hosts, devices];

  fixtures.forEach(models => {
    models.forEach(model => {
      model.save();
    });
  });
};

export default init;
