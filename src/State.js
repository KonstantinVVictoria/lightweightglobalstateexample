import GlobalState from "./GlobalState";
import React, { Component } from "react";
const date = new Date();
const time = date.getTime();
var now = GlobalState;
var events = [];
var eventsDependancies = { timeDelta: [] };
var debugArgList = { isDebugging: false, showInitialMount: false };
let currentEvent = "";

const show = () => {
  return now;
};

const mergeState = (componentLink, now) => {
  if (!Object.keys(componentLink.globalLink).length)
    return componentLink.globalLink;
  Object.entries(now).forEach((property) => {
    if (componentLink.globalLink.hasOwnProperty(property[0])) {
      componentLink.globalLink[property[0]] = property[1];
    }
  });
  return componentLink.globalLink;
};

const updateState = (componentLink, changes) => {
  let isChangedComponent = false;

  changes.changedProperties.forEach((property) => {
    if (componentLink.globalLink.hasOwnProperty(property)) {
      isChangedComponent = true;
    }
  });

  if (isChangedComponent) {
    componentLink.component.setState(mergeState(componentLink, now));
  }
};
const createEvent = (change) => {
  if (debugArgList.isDebugging) {
    let timeDelta = eventsDependancies.timeDelta[
      eventsDependancies.timeDelta.length - 1
    ]
      ? new Date().getTime()
      : time;

    let event = {
      event: change[1](eventsDependancies.timeDelta),
      timeQoutient: eventsDependancies.timeDelta[
        eventsDependancies.timeDelta.length - 1
      ]
        ? timeDelta -
          eventsDependancies.timeDelta[eventsDependancies.timeDelta.length - 1]
        : "",
    };
    event[change[0]] = State.now[change[0]];
    events.push(event);
    eventsDependancies.timeDelta.push(timeDelta);
  }
};
const addLink = (hook, hookFunction) => {
  if (hook) {
    now[hook] = { [hook]: hookFunction };
  }
};
const hook = (hook) => {
  if (hook) {
    return () => {
      let hookEvent = Object.keys(hook)[0];

      if (currentEvent !== hookEvent && currentEvent !== "initial_mount") {
        currentEvent = Object.keys(hook)[0];
        let newState = {};
        newState[currentEvent] = now[currentEvent][currentEvent];

        State.changesTo(newState);
        return now[currentEvent][currentEvent];
      }
    };
  }
};
const Link = (links) => {
  if (links) {
    Object.entries(links).forEach((hook) => {
      addLink(hook[0], hook[1]);
    });
    Object.entries(links).forEach((hookFunction) => {
      let hookObject = {};
      hookObject[hookFunction[0]] = hookFunction[1];

      hook(hookObject)();
    });
  }
};
const links = (component, G_State, links) => {
  if (debugArgList.showInitialMount) {
    currentEvent = "initial_mount";
    let initialEvent = [
      "initial_mount",
      () => {
        return "initial_mount";
      },
    ];

    createEvent(initialEvent);
  }

  if (typeof component === "function") {
    return instantiate(component, G_State, links);
  } else {
    if (links) {
      component.componentDidUpdate = () => {
        Link(links);
      };
    }
    let componentLink = { component: component, globalLink: G_State };
    let listenToUpdate = (event) => {
      return updateState(componentLink, event.detail);
    };
    document.addEventListener("stateChanged", listenToUpdate);

    component.componentWillUnmount = () => {
      document.removeEventListener("stateChanged", listenToUpdate);
    };
    mergeState(componentLink, now);
  }
};

const changesTo = (changes) => {
  let changedProperties = [];
  Object.entries(changes).forEach((change) => {
    changedProperties.push(change[0]);
    currentEvent = change[0];
    createEvent(change);

    if (debugArgList.isDebugging) {
      debug();
    }
  });
  document.dispatchEvent(
    new CustomEvent("stateChanged", {
      detail: {
        changedProperties: changedProperties,
        now: now,
      },
    })
  );
};
const addProperty = (propertyName, property) => {
  now[propertyName] = property;
};

const removeProperty = (propertyName) => {
  delete now[propertyName];
};

const instantiate = (ChildComponent, G_State, links) => {
  class Comp extends Component {
    constructor(props) {
      super(props);
      State.links(this, G_State);
    }
    componentDidUpdate = () => {
      Link(links);
    };

    render() {
      return (
        <React.Fragment>
          <ChildComponent />
        </React.Fragment>
      );
    }
  }
  return Comp;
};

const debug = (args) => {
  if (args) {
    Object.keys(args).forEach((arg) => (debugArgList[arg] = true));
  }
  debugArgList.isDebugging = true;
  window.events = events;
};

var State = {
  now,
  show,
  updateState,
  links,
  addProperty,
  removeProperty,
  changesTo,
  debug,
  addLink,
  hook,
};

export default State;
