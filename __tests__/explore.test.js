describe('Basic user flow for Website', () => {

    // First, visit the note app
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/index.html');
    });

    // Next, check to make sure that add button is loaded
    it('Initial Home Page - Check for add button', async () => {
        const button = await page.$('.add-note');
        console.log(button);
        expect(button);

        console.log("checking that add-note is a button");
        // check that element's tag name is indeed a button
        const tagName = await page.evaluate(element => element.tagName.toLowerCase(), button);
        expect(tagName).toBe('button')
    });

    // check if clicking on add notes addes more elements in notes app
    it('Checking that adding button creates new note', async () => {
        console.log('Checking the "add note" button...');

        // store number of elements before we click on button

        const numInitialElets = await page.$$eval('#notes-app > *', notes => notes.length);
        console.log('amount of elements inside of notes app: ' + numInitialElets);

        const button = await page.$('.add-note');
        if (button) {
            await button.click();
        }

        // store number of elements after we click on button
        const numAfterElets = await page.$$eval('#notes-app > *', notes => notes.length);
        console.log('amount of elements inside of notes app after click: ' + numAfterElets);

        expect(numAfterElets).toBe(numInitialElets + 1);

        console.log('Checking editing new note function...');
        await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            noteElement.value = "This is an edited note";
        });

        await page.keyboard.press('Tab');

        // Check if the edited content is saved
        const editedContentSavedClickBody = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return noteElement.value === "This is an edited note";
        });

        console.log("Edited content saved - tab:", editedContentSavedClickBody);

        await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            noteElement.value = "This is an edited note again";
        });

        await page.click('body');

        const editedContentSavedTab = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return noteElement.value === "This is an edited note again";
        });

        console.log("Edited content saved - click outside:", editedContentSavedTab);
        expect(editedContentSavedTab).toBe(true);
        expect(editedContentSavedClickBody).toBe(true);

    }, 10000);

    it('checking existing note works as intended', async () => {
        console.log('checking existing note works as intended...');

        const getNotes = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return noteElement;
        });
        const item = getNotes;
        await page.click('.note');
        console.log('item is' + item);

        await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            noteElement.value = "This is an edited note 2.0";
        });
        await page.keyboard.press('Tab');

        // Check if the edited content is saved
        const editedContentSavedClickBody = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return noteElement.value === "This is an edited note 2.0";
        });

        console.log("Edited content saved - tab:", editedContentSavedClickBody);

        await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            noteElement.value = "This is an edited note again 2.0";
        });

        await page.click('body');

        const editedContentSavedTab = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return noteElement.value === "This is an edited note again 2.0";
        });

        console.log("Edited content saved - click outside:", editedContentSavedTab);
        expect(editedContentSavedTab).toBe(true);
        expect(editedContentSavedClickBody).toBe(true);

    }, 2500);

    // check if number of notes is same after reload
    it('Checking number of notes is same after reload', async () => {
        console.log('Checking number of notes is same after reload...');
        const numBeforeReload = await page.$$eval('#notes-app > *', notes => notes.length);
        console.log('amount of elements inside of notes app before reloading: ' + numBeforeReload);

        await page.reload();

        const numAfterReload = await page.$$eval('#notes-app > *', notes => notes.length);
        console.log('amount of elements inside of notes app after reloading: ' + numAfterReload);
        expect(numBeforeReload).toBe(numAfterReload);
    }, 10000);

    it('Checking that double clicking deletes the note', async () => {
        let numNotesBeforeDelete = await page.$$eval('#notes-app > *', notes => notes.length);
        await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            noteElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        });

        // Check if the note is deleted on page
        const isNoteDeleted = await page.evaluate(() => {
            const noteElement = document.querySelector('.note');
            return !noteElement;
        });

        // Check if the note is deleted from local storage
        const numLocalStorageNotes = await page.evaluate(() => {
            const notesFromLocalStorage = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]").length;
            return notesFromLocalStorage;
        });

        expect(isNoteDeleted).toBe(true);
        // one is add note button. One is deleted note
        expect(numLocalStorageNotes).toBe(numNotesBeforeDelete - 2);
    }, 10000);
});
