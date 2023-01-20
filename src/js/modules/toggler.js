/**
 * Toggler
 *
 * Toggles .open class of container and trigger
 * Toggles focus of an input if set
 *
 * Usage:
 *
 * Add to trigger elements
 * data-toggler-trigger="id" // toggler main id for view
 *
 * Add to container
 * data-toggler="id-" // toggler main id for view
 * data-toggler-focus="id" // toggler input to toggle focus
 * data-toggler-hide="id" // toggler child to toggle open
 * 
 * Add to element containing tabable content whilst view is open
 * Only required if using data-toggler-hide and outside of hide element
 * data-toggler-focus-trap
 */
const toggler = () => {
    const $html = $("html");
    const $document = $(document);
    const $views = $("[data-toggler]");
    const $site = $("#site");
    const KEY_ESC = "Escape";
    const displayNoneDelay = 1000; // ms
    let id, displayNoneTimeout, $view, $viewHide, $viewFocusTrap, $button, $triggers, $focus;

    $document.on("click", ({ target }) => {
        $button = $(target.closest(`[data-toggler-trigger]`));

        if ($button.length > 0) {
            doTrigger($button);
        }
    });

    const init = () => {
        $views.each((index, target) => {
            showView($(target), false);
        });
    }

    const showView = ($view, show=true) => {
        $viewHide = $(`#${ $view.attr("data-toggler-hide") }`);
        if (!$viewHide.length) $viewHide = $view;

        $viewFocusTrap = $view.find("[data-toggler-focus-trap]");
        if (!$viewFocusTrap.length) $viewFocusTrap = $viewHide;

        $viewHide
        .attr("aria-hidden", !show)
        .attr("aria-expanded", show);

        if (show) {
            clearTimeout(displayNoneTimeout);
            $view.scrollTop(0);
            // Use focus trap on show to extend focusable elements outside $viewHide
            $viewFocusTrap.find("*:not([data-toggler-force-tabindex])").removeAttr("tabindex");
            $viewHide.show();
        } else {
            $viewHide.find("*:not([data-toggler-force-tabindex])").attr("tabindex", "-1");
            displayNoneTimeout = setTimeout(() => {
                $viewHide.hide();
            }, displayNoneDelay);
        }
    }

    const doToggle = (elements, open) => {
        const { $view, $triggers, $focus } = elements;

        open = open != null ? open : !$view.hasClass("open");

        if (open) {
            $site.find("*:not([data-toggler-force-tabindex])").attr("tabindex", "-1");
            $document.on("keyup", ({ key }) => {
                if (key == KEY_ESC) {
                    doToggle(elements, false);
                }
            });
        } else {
            $site.find("*:not([data-toggler-force-tabindex])").removeAttr("tabindex");
            $document.off("keyup");
        }

        showView($view, open);

        $view.toggleClass("open", open);
        $triggers.toggleClass("open", open);

        if ($focus) {
            $focus[ open ? "focus" : "blur" ]();
        }

        if (!open) {
            $view.find(":focus").blur();
        }
    }

    const doTrigger = ($button) => {
        id = $button.attr("data-toggler-trigger");
        $view = $(`[data-toggler=${ id }]`);
        $triggers = $(`[data-toggler-trigger=${ id }]`);
        $focus = $view.find(`#${ $view.attr("data-toggler-focus") }`);

        doToggle({ $view, $triggers, $focus });
    }

    init();
}

$(toggler);

export default toggler;
