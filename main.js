const queryHelper = require("./db/queryHelper");
// const questions = require("./questions");

async function main() {
    try {

        const data = await queryHelper.viewAllEmployees();
        console.table(data);

    } catch(err) {
        console.log(err);
    }
};

main();