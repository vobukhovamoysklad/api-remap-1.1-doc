/* eslint-env browser */
/* eslint quotes: [2, "single"] */
'use strict';

/*
 Get a list of direct child elements by class name.
 */
function childrenByClass(element, name) {
    var filtered = [];

    for (var i = 0; i < element.children.length; i++) {
        var child = element.children[i];
        if (child.className.indexOf(name) !== -1) {
            filtered.push(child);
        }
    }

    return filtered;
}

/*
 Collapse or show a request/response example.
 */
function toggleCollapseButton(event) {
    var button = event.target.parentNode;
    var content = button.parentNode.nextSibling;

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Currently showing, so let's hide it
        button.className = 'collapse-button';
        content.style.maxHeight = '0px';
    } else {
        // Currently hidden, so let's show it
        button.className = 'collapse-button show';
        if (content !== null) {
            content.style.maxHeight = content.children[0].offsetHeight + 12 + 'px';
        }
    }
}

function toggleCollapseCodeButton(event) {
    var button = event.target.parentNode;
    var content = button.parentNode.nextSibling;

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Currently showing, so let's hide it
        button.className = 'collapse-code-button';
        content.style.padding = 0;
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
    } else {
        // Currently hidden, so let's show it
        button.className = 'collapse-code-button show';
        content.style.padding = 12;
        if (content !== null) {
            content.style.maxHeight = content.children[0].offsetHeight + 24 + 'px';
        }
        content.style.overflow = 'auto';
    }
}

function toggleTabButton(event) {
    var i, index;
    var button = event.target;

    // Get index of the current button.
    var buttons = childrenByClass(button.parentNode, 'tab-button');
    for (i = 0; i < buttons.length; i++) {
        if (buttons[i] === button) {
            index = i;
            button.className = 'tab-button active';
        } else {
            buttons[i].className = 'tab-button';
        }
    }

    // Hide other tabs and show this one.
    var tabs = childrenByClass(button.parentNode.parentNode, 'tab');
    for (i = 0; i < tabs.length; i++) {
        if (i === index) {
            tabs[i].style.display = 'block';
        } else {
            tabs[i].style.display = 'none';
        }
    }
}

/*
 Collapse or show a navigation menu. It will not be hidden unless it
 is currently selected or `force` has been passed.
 */
function toggleCollapseNav(event) {
    var heading = event.target.parentNode;
    var content = heading.nextSibling;

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Currently showing, so let's hide it, but only if this nav item
        // is already selected. This prevents newly selected items from
        // collapsing in an annoying fashion.
        content.style.maxHeight = '0px';

    } else {
        // Currently hidden, so let's show it
        if (content !== null) {
            content.style.maxHeight = content.children[0].offsetHeight + 12 + 'px';
        }
    }
}

/*
 Refresh the page after a live update from the server. This only
 works in live preview mode (using the `--server` parameter).
 */
function refresh(body) {
    document.querySelector('body').className = 'preload';
    document.body.innerHTML = body;

    // Re-initialize the page
    init();

    document.querySelector('body').className = '';
}

/*
 Initialize the interactive functionality of the page.
 */
function init() {
    var i, j;

    // Make collapse buttons clickable
    var buttons = document.querySelectorAll('.collapse-button');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = toggleCollapseButton;
    }

    var buttons1 = document.querySelectorAll('.collapse-code-button');
    for (i = 0; i < buttons1.length; i++) {
        buttons1[i].onclick = toggleCollapseCodeButton;
    }

    var responseCodes = document.querySelectorAll('.example-names');
    for (i = 0; i < responseCodes.length; i++) {
        var tabButtons = childrenByClass(responseCodes[i], 'tab-button');
        // Show by default?
        toggleTabButton({target: tabButtons[0]});
        for (j = 0; j < tabButtons.length; j++) {
            tabButtons[j].onclick = toggleTabButton;
        }
    }

    // Make nav items clickable to collapse/expand their content.
    var navItems = document.querySelectorAll('nav .resource-group .heading');
    for (i = 0; i < navItems.length; i++) {
        navItems[i].onclick = toggleCollapseNav;
    }
}

// Initial call to set up buttons
init();

window.onload = function () {
    // Remove the `preload` class to enable animations
    document.querySelector('body').className = '';
};
