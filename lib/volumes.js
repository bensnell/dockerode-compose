module.exports = async function(docker, projectName, recipe, output) {
  var volumes = [];
  var volumeNames = Object.keys(recipe.volumes || []);
  for (var volumeName of volumeNames) {
    var volume = recipe.volumes[volumeName];
    if (volume.external === true) continue;
    var opts = {
      'Name': projectName + '_' + volumeName,
      'Driver': volume.driver,
      'DriverOpts': volume.driver_opts,
      'Labels': volume.labels
    };
    if (volume.name !== undefined) {
      opts.Name = volumeName;
    }
    try {
      volumes.push(await docker.createVolume(opts));
    } catch (err) {
      throw err;
    }
  }
  return volumes;
}