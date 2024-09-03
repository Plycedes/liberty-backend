const { assert } = require("chai");

describe("Liberty", async () => {
    let liberty, deployer, owner, title, description, image;

    beforeEach(async () => {
        liberty = await ethers.deployContract("Liberty");
        deployer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        owner = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        title = "King Abhay";
        description = "Make Abhay the King";
        image = "abhay.png";
    });

    describe("createPetition", async () => {
        it("Creates a petiton", async () => {
            const initalNum = Number(await liberty.numberOfPetitions());
            const tx = await liberty.createPetition(owner, title, description, image);
            const tr = await tx.wait();
            //console.log(tr.logs[0].args[0]);
            const finalNum = Number(tr.logs[0].args[0]);
            assert.equal(initalNum + 1, finalNum);
        });
    });

    describe("voteToPetition", async () => {
        beforeEach(async () => {
            const tx = await liberty.createPetition(owner, title, description, image);
            await tx.wait();
        });
        it("Casts vote", async () => {
            const tx = await liberty.voteToPetition(1);
            const tr = await tx.wait();
            const votes = Number(tr.logs[0].args[0]);
            assert.equal(1, votes);
        });
    });
});
