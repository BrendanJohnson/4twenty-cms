!(function ($) {
    // regular js

    function equalHeights(jqObject) {
        var maxHeight = 0;
        jqObject.each(function () {
            maxHeight = $(this).outerHeight() > maxHeight ? $(this).outerHeight() : maxHeight;
        });
        jqObject.css("min-height", maxHeight);
    }

    function formatDate( pubDate )
    {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //var dateObj = new Date(Date.parse(pubDate));
        var dateObj = pubDate.split('/'),
        mnth = monthList[ parseInt(dateObj[1])-1],
        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ",
        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ",
        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2] + "</span> ";
        return myDay + myMonth;          
    }

    // jquery
    $(function () {

        // bootstrap classes
        $("#dynamic-container, #content-container, #job-dynamic-container")
            .wrap("<div class='container-fluid'></div>")
            .addClass("row");
        $("#content-container.newDash").removeClass("container");

        if ($.trim($("#dynamic-side-left-container a:visible, #side-left a:visible, #job-side-column a:visible").text()).length) {
            $("#dynamic-side-left-container, #side-left").addClass("col-md-4 hidden-sm hidden-xs pull-right");
            $("#dynamic-content, #content-container #content").addClass("col-md-8 col-sm-12 col-xs-12 pull-left");

            $("#job-side-column").addClass("col-lg-4 hidden-md hidden-sm hidden-xs pull-left");
            $("#job-dynamic-container #content").addClass("col-lg-8 col-md-12 col-sm-12 col-xs-12 pull-right");
        } else {
            $("#dynamic-side-left-container, #side-left").hide();
            $("#dynamic-content, #content").addClass("col-xs-12");
        }
        $("#side-right, #dynamic-side-right-container").hide();

        // make header sticky.
        var headerHeight = $("#r19_header-container").height();
        $("body").addClass("r19_sticky-header");

        // skip link
        $("#skip-link").attr("href", "#" + $("#dynamic-content, #content").attr("id"));

        // remove empty li's and ul's on the system pages. 
        $(".links-2 li:empty").remove();
        $(".links-2 ul:empty").remove();

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");

        // add nbsp;
        $("#side-drop-menu > li > ul > li > a").each(function () {
            var linkText = $(this).text();
            linkText = linkText.replace(" (", "&nbsp;(");
            $(this).html(linkText);
        });

        // move news rss feed to bottom of news index.
        $(".newsIndex").append($(".newsIndex .search-options"));
        // move date on new page.
        $(".news-individual-container").each(function () {
            $(this).children(".news-excerpt").children("h3").after($(this).children(".news-date"));
        });

        // generate actions button 
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button 
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });

        // copy header social media links to footer and contact page.
        var contactSocialMedia = $("#r19_top-bar .r19_social-media").clone()
        var footerSocialMedia = $("#r19_top-bar .r19_social-media").clone();
        $("#r19_contact-us-social-media").prepend(contactSocialMedia);
        $("#r19_footer-social-media").append(footerSocialMedia);

        // mobile menu
        $("#r19_mobile-navigation").click(function (e) {
            e.preventDefault();
            $("#r19_navigation > ul").toggleClass("active");
        });

        // home banner
        $(".r19_slider").cycle({
            slides: "> div",
            delay: -10000,
            timeout: 10000
        });

        // inner banners
        // write inner banner image if it doesn't already contain an image
        if ($("#r19_inner-banner-container:visible").length && !$("#r19_inner-banner-container img").length) {
            var parentIndex;
            $("#r19_navigation a").each(function () {
                if (location.pathname.toLowerCase() == $(this).attr("href")) {
                    parentIndex = $(this).closest("#r19_navigation > ul > li").index();
                }
            });
            $("#r19_inner-banner-container").prepend($("<img src='/media/site/4twenty/images/banners/inner-" + (parentIndex || "0") + ".jpg' alt='Responsive 19' />"));
        }

        // if user logged in, change register links to dashboard.
        if ($(".user-loggedIn").length) {
            $("a[href='/member/register.aspx']").text("My Dashboard");
            $("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");

            $("a[href='/member/login.aspx']").text("Logout");
            $("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
        }

        function makeSameHeight(jqObject) {
            var maxHeight = 0;
            jqObject.each(function () {
                maxHeight = $(this).outerHeight() > maxHeight ? $(this).outerHeight() : maxHeight;
            });
            jqObject.each(function () {
                $(this).css("min-height", maxHeight);
            });

        }
        // make photo boxes alll same height
        makeSameHeight($(".r19_photo-box"));
        makeSameHeight($(".r19_home-call-to-action-box"));

        // homepage call to action, duplicate anchor
        $(".r19_home-call-to-action-box").each(function () {
            var myLink = $(this).find(".r19_button a").attr("href");
            $(this).find("h2").wrapInner("<a href='" + myLink + "'></a>");
        });

        // put first h1 in banner
        if (
            $("#r19_inner-banner-container").length &&
            $(".dynamic-content-holder  h1:first").length &&
            $(".dynamic-content-holder  h1:first").length &&
            !$(".r19_slider").length
        ) {
            $("#r19_inner-banner-container").append($(".dynamic-content-holder  h1:first"));
            $("#r19_inner-banner-container").append($("#content  h1:first"));

        }
        if (
            $("#r19_inner-banner-container").length &&
            $("#content h1:first").length &&
            !$(".r19_slider").length
        ) {
            $("#r19_inner-banner-container").append($("#content h1:first"));
        }
        // home jobs widget
        $("#r19_home-latest-jobs ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/job/rss.aspx?search=1&addlocation=1"],
                    addNBSP: false
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></div></li>"

                },
                predicates: {
                    pubDate: formatDate
                },
                complete: function () {
                    if( $(this).children().length ) {
                        $(this).children().each( function(){
                        $(this).find('.rss-item-pubDate-month').text( $(this).find('.rss-item-pubDate-month').text().substr(0,3) );
                        });
                    }

                    // put location in a span of its own after pubdate.
                    $(this).children().each(function () {
                        var myLocation = $("<span class='rss-item-location'>" + $(this).find(".xmlLocation").text() + "</span>");
                        $(this).find(".xmlLocation").remove();
                        $(this).find(".rss-item-pubDate").after(myLocation);
                    });
                    // put two .rss-item's in one li
                    var myJobs = $(this).children();
                    var myNewUL = $("<ul></ul>");
                    myNewUL.append("<li></li>");
                    myJobs.each(function (i) {
                        if (i > 1 && (0 == i % 4))
                        // 4th job
                        {
                            myNewUL.append("<li></li>");
                        }
                        myNewUL.children("li:last").append($(this).clone().html());
                    });
                    $(this).html(myNewUL.html());
                    if ($(this).children().length > 1) {
                        $(this).jcarousel({
                            auto: 5,
                            scroll: 1,
                            wrap: "circular",
                            vertical: true
                        });
                    }
                }
            });
        });
        //sticky header
 $(window).scroll(function() {
            var sticky = $('#r19_navigation-container'),
                scroll = $(window).scrollTop();
            if (scroll) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });
        // footer testimonials widget
        $(".r19_testimonials ul").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"]
                },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></div></li>"
                },
                complete: function () {
                     if ($(this).children().length > 1){ 
                     	$(this).bxSlider({
  mode: 'vertical',
                            controls:false,
                            pager:false,
                            auto:true
                        });
                     }
                }
            });
        });

        // expandable tab
        $(".r19_tab-heading a").click(function (e) {
            if (!$(this).attr("href")) {
                e.preventDefault();
                $(this).parent().parent().toggleClass("active");
                $(this).parent().parent().next(".r19_tab-content").toggleClass("active");
            }
        });
        // if tab is in hash, click it automatically. 
        if (location.hash.toLowerCase() && $(location.hash.toLowerCase()).length) {
            $(location.hash.toLowerCase()).find("a").click();
            scrollToDiv(location.hash.toLowerCase());
        }
        // in case top navigation redirects to a hash.
        $("#r20_navigation a, #r20_left-navigation a").click(function (e) {
            var myLink = $(this).attr("href") || "";
            var myHash = myLink.substr(myLink.indexOf("#"));
            var myHeadingLink = $(myHash + ".r20_tab-heading");
            if (myHeadingLink.length) {
                e.preventDefault();
                myHeadingLink.find("a").click();
                scrollToDiv(myHeadingLink);
            }
        });

        // add iframe url for a map
        function loadMap(iframeObject) {
            // if the iframe has no src or a blank src, and it has a data-src attribute
            if (!(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src")) {
                iframeObject.attr("src", iframeObject.attr("data-src"));
            }
        }
        // scroll to a map
        function scrollToDiv(divID) {
            $("html, body").animate({
                scrollTop: $(divID).offset().top - ($(".r19_sticky-header #r19_header-container").height() || 0) - 20
            }, 300);
        }
        // if a location hash is on the url, add active to the div.
        if (location.hash && $(location.hash + ".r19_map").length) {
            $(location.hash + ".r19_map").addClass("active");
        } else {
            // otherwise, just make the first map active.
            $(".r19_map:first").addClass("active");
        }
        loadMap($(".r19_map.active iframe"));
        // contact page maps on click
        $(".r19_contact-map-link, .footer-location a").click(function (e) {
            var targetMap = $($(this).attr("href"));
            if (targetMap.length) {
                e.preventDefault();
                loadMap(targetMap.children("iframe"));
                scrollToDiv(targetMap);
                $(".r19_map").not(targetMap).removeClass("active");
                targetMap.addClass("active");
            }
        });

        // equal height columns
        equalHeights($(".r19_home-call-to-action-box"));

        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function () {
            $(this).hide();
        });
		
		$( "#footer" ).prepend($("#dynamic-side-left-container .cv-dropoff").html());
		$("#dynamic-side-left-container .cv-dropoff").html('');		
    });

})(jQuery);
