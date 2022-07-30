class InfoController {
  getInfo(req, res) {
    const info = {
      argEntrada: process.argv,
      os: process.platform,
      nodeVs: process.version,
      memoryUsage: process.memoryUsage(),
      excPath: process.execPath,
      processID: process.pid,
      folder: process.cwd(),
    };

    return res.render("info", {array: info});
  }
}

module.exports = InfoController;
