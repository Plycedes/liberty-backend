const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LibertyModule", (m) => {
    const liberty = m.contract("Liberty");
    return { liberty };
});
