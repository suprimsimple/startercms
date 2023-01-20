import Cookies from "js-cookie"

/**
 * Accessibility toggles
 */
const accessibilityToggles = () => {
    const attr = "data-a11y-toggle";
    const activeClass = "--active";
    const cookiePrefix = "a11y-";
    const $html = $("html");
    const $buttons = $(`[${ attr }]`);
    let $target, id, value;

    const getCookie = ($button) => {
        if (Cookies.get(`${ cookiePrefix }${ $button.attr(attr) }`) == "true") {
            doToggle($button);
        }
    }

    const setCookie = ($button) => {
        id = `${ cookiePrefix }${ $button.attr(attr) }`;
        value = $button.hasClass(activeClass);
        $html.attr(`data-${ id }`, value);
        Cookies.set(id, value);
    }

    const doToggle = ($button) => {
        $button.toggleClass(activeClass);
        setCookie($button);
    }

    $buttons.each((index, target) => {
        $target = $(target);
        getCookie($target);

        $target.on("click", ({ currentTarget }) => {
            doToggle($(currentTarget));
        });
    });

    alert("ssdfsdf");
}

$(accessibilityToggles);

export default accessibilityToggles;
