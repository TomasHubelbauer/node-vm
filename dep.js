module.exports = async function () {
  console.log('running', process.argv);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('ran');
};

module.exports = module.exports();
