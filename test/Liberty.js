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
        it("creates a petiton", async () => {
            const initalNum = Number(await liberty.numberOfPetitions());
            const tx = await liberty.createPetition(owner, title, description, image);
            const tr = await tx.wait();
            console.log(tr);
            const finalNum = Number(await liberty.numberOfPetitions());
            assert.equal(initalNum + 1, finalNum);
        });
    });
});
