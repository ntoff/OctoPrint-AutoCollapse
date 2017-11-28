/*
 * View model for OctoPrint-AutoCollapse
 *
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function AutocollapseViewModel(parameters) {
        var self = this;
        'use strict';
        self.settings = parameters[0];
        //self.state = parameters[1];

        function collapseFiles(timeout) {
            var timeout = timeout;
                self.timerCollapse = setTimeout(function() {
                    var filesAccordion = $("#files");
                    if (filesAccordion.hasClass("in")) {
                        filesAccordion.collapse("hide") && filesAccordion.attr("class", "accordion-body collapse");
                    }
                }, timeout*1000);
        }
        self.onBeforeBinding = function () {
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
            if (timeout == 0) { 
                console.log("Files accordion auto collapse is disabled.");
                return 
            } else {
                collapseFiles(timeout);
            }
        }

        self.onSettingsHidden = function () {
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
        }
        
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutocollapseViewModel,
        dependencies: [ "settingsViewModel"/*, "printerStateViewModel" */],
        elements: [ /* ... */ ]
    });
});
