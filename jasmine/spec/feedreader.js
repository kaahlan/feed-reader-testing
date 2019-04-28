/** feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/** We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /** This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /** This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /** Loops through each feed in the allFeeds object and
        * ensures it has a URL defined and that the URL is
        * not empty.
        */
        it('have a URL defined and the URL is not empty', function() {
            for(i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            };
        });

        /** Loops through each feed in the allFeeds object and
        * ensures it has a name defined and that the name is
        * not empty.
        */
        it('have a name defined and the name is not empty', function() {
            for(i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            };
        });
    });

    /** Second test suite - Menu functionaility.*/
    describe('The Menu', function() {
        /** Ensures the menu element is hidden by default.*/
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /** Ensures the menu changes visibility when the menu
        * icon is clicked. This test has two expectations: does
        * the menu display when clicked and does it hide when
        * clicked again.
        */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /** Third test suite - loadFeed functionality.*/
    describe('Initial Entries', function() {
        /** Ensures there is at least a single .entry element within
        * the .feed container when the loadFeed function is called
        * and completes its work. loadFeed() is asynchronous so
        * this test requires the use of Jasmine's beforeEach and
        * asynchronous done() function. The beforeEach function is
        * called once before each spec in the describe function.
        */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('are loaded once loadFeed function is called', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /** Fourth test suite - New Feed Selections functionality.*/
    describe('New Feed Selection', function() {
        /** Ensures that the content actually changes when
        * a new feed is loaded by the loadFeed function. Sets
        * a variable for the old feed selection, loads the second
        * feed, and then makes sure the old html does not match
        * the new html.
        */
        let oldFeedSelection;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeedSelection = $('.feed').html();
                loadFeed(1, function() {
                  done();
                });
            });
        });

        it('is different from old feed selection', function() {
            expect(oldFeedSelection).not.toBe($('.feed').html());
        });
    });
}());
