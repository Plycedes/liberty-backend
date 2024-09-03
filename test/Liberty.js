const { assert, expect } = require("chai");

describe("Liberty", async () => {
    let liberty, deployer, owner, title, description, image;

    beforeEach(async () => {
        liberty = await ethers.deployContract("Liberty");
        deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        title = "King Abhay";
        description = "Make Abhay the King";
        image = "abhay.png";
    });

    describe("createPetition", async () => {
        it("Creates a petiton", async () => {
            const initalNum = Number(await liberty.numberOfPetitions());
            const tx = await liberty.createPetition(owner, title, description, image);
            const tr = await tx.wait();
            const finalNum = Number(tr.logs[0].args[0]);
            assert.equal(initalNum + 1, finalNum);
        });
    });

    describe("voteToPetition", async () => {
        beforeEach(async () => {
            const tx = await liberty.createPetition(owner, title, description, image);
            await tx.wait();
        });
        it("Reverts if the petition does not exists", async () => {
            await expect(liberty.voteToPetition(1)).to.be.reverted;
        });
        it("Casts vote", async () => {
            const tx = await liberty.voteToPetition(0);
            const tr = await tx.wait();
            const votes = Number(tr.logs[0].args[0]);
            assert.equal(1, votes);
        });
        it("Maps voters", async () => {
            const [signer] = await ethers.getSigners();
            const tx = await liberty.voteToPetition(0);
            const tr = await tx.wait();
            const voter = tr.logs[0].args[1][0];
            assert.equal(signer.address, voter);
        });
    });

    describe("getPetitions", async () => {
        beforeEach(async () => {
            const tx = await liberty.createPetition(owner, title, description, image);
            await tx.wait();
        });
        it("Returns all petitions", async () => {
            const initialNum = Number(await liberty.numberOfPetitions());
            await liberty.voteToPetition(0);
            const response = await liberty.getPetitions();
            assert.equal(initialNum, response.length);
        });
    });
});
