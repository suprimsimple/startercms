/**
 * Scroller
 */
const scroller = () => {
    let scrollers = {};

    // constants
    const SCROLL_DIRECTION_BUFFER = 16; // px

    const PREFIX =              'data-scroller';
    const ID =                  `${ PREFIX }-id`;
    const ATTR__ITEM =          `${ PREFIX }-item`;
    const ATTR__CONTAINER =     `${ PREFIX }-container`;

    // container states
    const IS_SCROLL_ZERO =      'is-scroll-zero';
    const IS_SCROLL_TOP =       'is-scroll-top';
    const IS_SCROLLING =        'is-scrolling';
    const IS_SCROLLING_UP =     `${IS_SCROLLING}--up`;
    const IS_SCROLLING_DOWN =   `${IS_SCROLLING}--down`;
    const IS_SCROLLING_LEFT =   `${IS_SCROLLING}--left`;
    const IS_SCROLLING_RIGHT =  `${IS_SCROLLING}--right`;

    // item states
    const IS_VIEWED =           'is-viewed';
    const IS_SPREAD =           'is-spread';
    const IS_SPREAD_X =         `${IS_SPREAD}--x`;
    const IS_SPREAD_Y =         `${IS_SPREAD}--y`;
    const IS_CONTAINED =        'is-contained';
    const IS_CONTAINED_X =      `${IS_CONTAINED}--x`;
    const IS_CONTAINED_Y =      `${IS_CONTAINED}--y`;
    const IS_OFFSCREEN =        'is-offscreen';
    const IS_OFFSCREEN_ABOVE =  `${IS_OFFSCREEN}--above`;
    const IS_OFFSCREEN_BELOW =  `${IS_OFFSCREEN}--below`;
    const IS_OFFSCREEN_BEFORE = `${IS_OFFSCREEN}--before`;
    const IS_OFFSCREEN_AFTER =  `${IS_OFFSCREEN}--after`;
    const IS_ENTERING =         'is-entering';
    const IS_ENTERING_ABOVE =   `${IS_ENTERING}--above`;
    const IS_ENTERING_BELOW =   `${IS_ENTERING}--below`;
    const IS_ENTERING_BEFORE =  `${IS_ENTERING}--before`;
    const IS_ENTERING_AFTER =   `${IS_ENTERING}--after`;
    const IS_ENTERED =          'is-entered';
    const IS_ENTERED_ABOVE =    `${IS_ENTERED}--above`;
    const IS_ENTERED_BELOW =    `${IS_ENTERED}--below`;
    const IS_ENTERED_BEFORE =   `${IS_ENTERED}--before`;
    const IS_ENTERED_AFTER =    `${IS_ENTERED}--after`;
    const IS_EXITING =          'is-exiting';
    const IS_EXITING_ABOVE =    `${IS_EXITING}--above`;
    const IS_EXITING_BELOW =    `${IS_EXITING}--below`;
    const IS_EXITING_BEFORE =   `${IS_EXITING}--before`;
    const IS_EXITING_AFTER =    `${IS_EXITING}--after`;

    /**
     * Update Scroll Container
     * @param {*} data
     */
    const updateContainer = (data) => {
        // current state
        const { state } = data;

        // updated state
        const {
            scrollLeft,
            scrollTop,
            clientWidth,
            clientHeight,
            scrollWidth,
            scrollHeight
        } = data.$element[0];

        // logic
        const scrollLeftMax = scrollWidth - clientWidth;
        const scrollLeftPercent = scrollLeft / scrollLeftMax || 0;
        const scrollTopMax = scrollHeight - clientHeight;
        const scrollTopPercent = scrollTop / scrollTopMax;
        const scrollDirectionRight = state.scrollLeft < scrollLeft;
        const scrollDirectionDown = state.scrollTop < scrollTop;
        const distanceTop = Math.abs(state.scrollTopPivot - scrollTop);
        const distanceLeft = Math.abs(state.scrollLeftPivot - scrollLeft);
        const isPassedBufferY = distanceTop > SCROLL_DIRECTION_BUFFER;
        const isPassedBufferX = distanceLeft > SCROLL_DIRECTION_BUFFER;

        const isScrollingRight = isPassedBufferX ?
            scrollDirectionRight : state.isScrollingRight;

        const isScrollingDown = isPassedBufferY ?
            scrollDirectionDown : state.isScrollingDown;

        let scrollTopPivot = state.scrollTopPivot || 0;
        if (state.isScrollingDown === scrollDirectionDown) {
            // continuing direction
        } else if (isPassedBufferY) {
            scrollTopPivot = scrollTop;
        }

        let scrollLeftPivot = state.scrollLeftPivot || 0;
        if (state.isScrollingRight === scrollDirectionRight) {
            // continuing direction
        } else if (isPassedBufferX) {
            scrollLeftPivot = scrollLeft;
        }

        // update state
        data.state = {
            ...data.state,
            scrollLeft,
            scrollTop,
            scrollTopPivot,
            scrollLeftPivot,
            isScrollingDown,
            isScrollingRight,
            clientWidth,
            clientHeight,
            scrollWidth,
            scrollHeight,
        };

        // clear and set timeout
        clearTimeout(data.timeout);
        data.timeout = setTimeout(() => {
            data.$element.toggleClass(IS_SCROLLING, false);
        }, 1000);

        // update classes
        data.$element
        .toggleClass(IS_SCROLLING, true)
        .toggleClass(IS_SCROLL_ZERO, scrollTop === 0)
        .toggleClass(IS_SCROLL_TOP, scrollTop < 160)
        .toggleClass(IS_SCROLLING_UP, !isScrollingDown)
        .toggleClass(IS_SCROLLING_DOWN, isScrollingDown)
        .toggleClass(IS_SCROLLING_LEFT, !isScrollingRight)
        .toggleClass(IS_SCROLLING_RIGHT, isScrollingRight);
    };

    /**
     * Update Item
     * @param {jquery} $item
     * @param {object} data
     */
    const updateItem = ($item, data) => {
        const {
            scrollLeft: x,
            scrollTop: y,
            clientWidth: w,
            clientHeight: h,
            scrollWidth: sw,
            scrollHeight: sh,
            isScrollingDown,
            isScrollingRight,
        } = data.state;

        const x2 = x + w;
        const y2 = y + h;

        const itemX = $item.offset().left;
        const itemY = $item.offset().top;
        const itemW = $item.outerWidth();
        const itemH = $item.outerHeight();
        const i = {
            x: itemX,
            y: itemY,
            w: itemW,
            h: itemH,
            x2: itemX + itemW,
            y2: itemY + itemH,
        };

        const isAbove = i.y < y;
        const isAbove2 = i.y2 < y;
        const isBelow = i.y > y2;
        const isBelow2 = i.y2 > y2;
        const isSpreadY = isAbove && isBelow2;
        const isContainedY = !isAbove && !isBelow2;
        const isEnteredAbove = isAbove2;
        const isEnteringAbove = isAbove && !isAbove2 && !isScrollingDown;
        const isExitingAbove = isAbove && !isAbove2 && isScrollingDown;
        const isEnteredBelow = !isBelow2;
        const isEnteringBelow = !isBelow && isBelow2 && isScrollingDown;
        const isExitingBelow = !isBelow && isBelow2 && !isScrollingDown;

        const isBefore = i.x < x;
        const isBefore2 = i.x2 < x;
        const isAfter = i.x > x2;
        const isAfter2 = i.x2 > x2;
        const isSpreadX = isBefore && isAfter2;
        const isContainedX = !isBefore && !isAfter2;
        const isEnteredBefore = isBefore2;
        const isEnteringBefore = isBefore && !isBefore2 && !isScrollingRight;
        const isExitingBefore = isBefore && !isBefore2 && isScrollingRight;
        const isEnteredAfter = !isAfter2;
        const isEnteringAfter = !isAfter && isAfter2 && isScrollingRight;
        const isExitingAfter = !isAfter && isAfter2 && !isScrollingRight;

        const beenViewed = $item.hasClass(IS_VIEWED);

        /**
         * Toggle classes based on state
         */
        $item
        .toggleClass(IS_VIEWED, beenViewed || !(isAbove2 || isBelow || isBefore2 || isAfter))
        .toggleClass(IS_SPREAD, isSpreadX || isSpreadY)
        .toggleClass(IS_SPREAD_X, isSpreadX)
        .toggleClass(IS_SPREAD_Y, isSpreadY)
        .toggleClass(IS_CONTAINED, isContainedX || isContainedY)
        .toggleClass(IS_CONTAINED_X, isContainedX)
        .toggleClass(IS_CONTAINED_Y, isContainedY)
        .toggleClass(IS_OFFSCREEN, isAbove2 || isBelow || isBefore2 || isAfter)
        .toggleClass(IS_OFFSCREEN_ABOVE, isAbove2)
        .toggleClass(IS_OFFSCREEN_BELOW, isBelow)
        .toggleClass(IS_OFFSCREEN_BEFORE, isBefore2)
        .toggleClass(IS_OFFSCREEN_AFTER, isAfter)
        .toggleClass(IS_ENTERING, isEnteringAbove || isEnteringBelow || isEnteringBefore || isEnteringAfter)
        .toggleClass(IS_ENTERING_ABOVE, isEnteringAbove)
        .toggleClass(IS_ENTERING_BELOW, isEnteringBelow)
        .toggleClass(IS_ENTERING_BEFORE, isEnteringBefore)
        .toggleClass(IS_ENTERING_AFTER, isEnteringAfter)
        .toggleClass(IS_ENTERED, isEnteredAbove || isEnteredBelow || isEnteredBefore || isEnteredAfter)
        .toggleClass(IS_ENTERED_ABOVE, isEnteredAbove)
        .toggleClass(IS_ENTERED_BELOW, isEnteredBelow)
        .toggleClass(IS_ENTERED_BEFORE, isEnteredBefore)
        .toggleClass(IS_ENTERED_AFTER, isEnteredAfter)
        .toggleClass(IS_EXITING, isExitingAbove || isExitingBelow || isExitingBefore || isExitingAfter)
        .toggleClass(IS_EXITING_ABOVE, isExitingAbove)
        .toggleClass(IS_EXITING_BELOW, isExitingBelow)
        .toggleClass(IS_EXITING_BEFORE, isExitingBefore)
        .toggleClass(IS_EXITING_AFTER, isExitingAfter);
    };

    /**
     * Update Items
     * @param {json} data
     */
    const updateItems = (data) => {
        const { state } = data;

        data.items.forEach(($item) => {
            updateItem($item, data);
        });

        for (const [key, value] of Object.entries(data.children)) {
            updateItem(value.$element, data);
            updateItems(value);
        };
    };

    /**
     * On Scroll
     * @param {*} data
     */
    const onScroll = (data) => {
        if (!data) return;
        updateContainer(data);
        updateItems(data);
    };

    /**
     * On Resize
     * @param {*} data 
     */
    const onResize = (data) => {
        onScroll(data);
    }

    /**
     * Build Tree
     * @param {String[]} tree
     */
    const buildTree = (tree) => {
        let obj = scrollers;

        tree.forEach((id) => {
            if (obj[id]) {
                // Progress to children
                obj = obj[id].children;
            } else {
                // Create
                const $element = $(`[${ ATTR__CONTAINER }][${ ID }="${ id }"]`);
                const $scroller = id === 'html' ? $(window) : $element;

                const data = obj[id] = {
                    $scroller,
                    $element,
                    state: {
                        scrollLeft: 0,
                        scrollTop: 0,
                        scrollTopPivot: 0,
                        scrollLeftPivot: 0,
                        isScrollingDown: true,
                        isScrollingRight: true,
                    },
                    items: [],
                    children: {},
                    timeout: () => {},
                };

                $scroller.on('scroll', () => { onScroll(data); });
                $(window).on('resize', () => { onResize(data); });
                // do initial scroll and resize
                onScroll(data);
                onResize(data);
            }
        });
    };

    /**
     * Get Tree Ids
     * @param {jquery} $item 
     */
    const getTreeIds = ($item) => {
        const treeIds = $item
        .parents(`[${ ATTR__CONTAINER }]`)
        .get().reverse().map(item => $(item).attr(ID));

        return treeIds;
    };

    /**
     * Init
     */
    const init = () => {
        const $items = $(`[${ ATTR__ITEM }]`);

        // Add main scroller container data attributes
        $('html')
        .attr(ID, 'html')
        .attr(ATTR__CONTAINER, '');

        // Build tree and add listeners
        $items.each((index, item) => {
            const $item = $(item);
            const tree = getTreeIds($item);
            buildTree(tree);
        });

        // Add items to tree
        $items.each((index, item) => {
            const $item = $(item);
            const tree = getTreeIds($item);
            const obj = tree.reduce((o, v) => o[v] || o.children[v], scrollers);
            obj.items.push($item);
        });

        onResize(scrollers.html);
    };

    init();
}

// Execute on load
$(scroller);

export default scroller;
