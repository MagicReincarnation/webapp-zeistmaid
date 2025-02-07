//<script>
/*<![CDATA[*/
document.addEventListener("DOMContentLoaded", function () {
    const tabs_vol_dan_ch = document.querySelectorAll("#myTab a");
    const target_untuktabs_vol_dan_ch = {
        "chapter-tab": document.getElementById("clwd"),
        "volume-tab": document.getElementById("clwd_volume"),
    };

    function tab_active_vol_dan_ch(tabId) {
        if (!target_untuktabs_vol_dan_ch[tabId]) return; 
        tabs_vol_dan_ch.forEach((tab) => tab.setAttribute("aria-selected", "false"));
        Object.values(target_untuktabs_vol_dan_ch).forEach((target_btn) => {
            if (target_btn) target_btn.style.display = "none";
        });

        document.getElementById(tabId).setAttribute("aria-selected", "true");
        target_untuktabs_vol_dan_ch[tabId].style.display = "block";

        localStorage.setItem("activeTab", tabId);
    }

    tabs_vol_dan_ch.forEach((e) => {
        e.addEventListener("click", function (event) {
            event.preventDefault();
            tab_active_vol_dan_ch(this.id);
        });
    });

    const lastActiveTab = localStorage.getItem("activeTab") || "chapter-tab"; tab_active_vol_dan_ch(lastActiveTab);
});
/*]]>*/
//</script>
  