/**
 * Improve scroll performance on touch devices
 * set event listeners passive
 */
if ("ontouchstart" in document.documentElement) {
    document.addEventListener("touchstart", ontouchstart, { passive: true });
}

// TODO: REVIEW -- when modules use listener during interaction -> restore back to this when existing context
$(document).on("keyup", ({ key }) => {
    if (key == "Escape") $(":focus").trigger("blur");
});
