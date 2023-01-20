// Additional functionality to Alpine
// a11y tabbing
$(() => {
    let $trigger, $content, expanded;

    $("[data-accordion-trigger]").each((index, target) => {
        $(`#${$(target).attr("aria-controls")}`).find("*").attr("tabindex", "-1");

        $(target).on("click", ({ target }) => {
            $trigger = $(target);
            $content = $(`#${$trigger.attr("aria-controls")}`);
            // Is reverse - Expanded is updated by Alpine on click after this is fired
            expanded = $trigger.attr("aria-expanded") == "false";
            $content.find("*").attr("tabindex", expanded ? "" : "-1");
        });
    });
});
