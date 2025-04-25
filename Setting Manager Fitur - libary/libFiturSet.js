class FiturSetting{constructor(){this.features=new Map,this.loadedCDNs=new Set}run_setting(e){this.features.set(e.id_feature,{...e,isActive:!1,cleanup:null,cdnLoaded:!1}),this.html_checkbox(e)}html_checkbox(e){let t=document.getElementById("feature_manager"),a=document.createElement("div");a.className="checkbox_managerfeature",a.innerHTML=`
      <div class="feature_header">
        <label class="checkbox_switch">
          <input class="inputfeature_m"  type="checkbox" id="${e.id_feature}" checked="${e.chek}">
          <span class="checkbox_slider"></span>
        </label>
        <div class="feature_title">${e.title}</div>
      </div>
      <div class="feature_description">${e.description}</div>
    `;let c=a.querySelector("input");c.checked="true"===localStorage.getItem(`feature-${e.id_feature}`),c.addEventListener("change",()=>this.click_feature(e.id_feature,c.checked)),t.appendChild(a),c.checked&&this.run_codeFeature(e.id_feature)}async click_feature(e,t){let a=this.features.get(e);a&&(t?await this.run_codeFeature(e):this.off_feature(e))}async run_codeFeature(e){let t=this.features.get(e);if(t.isActive)return;t.cdnUrl&&!this.loadedCDNs.has(t.cdnUrl)&&(await this.loadCDN(t.cdnUrl),this.loadedCDNs.add(t.cdnUrl));let a=await t.run_code();t.isActive=!0,t.cleanup=a,localStorage.setItem(`feature-${e}`,"true")}off_feature(e){let t=this.features.get(e);t.isActive&&(t.cleanup&&"function"==typeof t.cleanup&&t.cleanup(),t.isActive=!1,t.cleanup=null,localStorage.setItem(`feature-${e}`,"false"))}loadCDN(e){return new Promise((t,a)=>{if(document.querySelector(`script[src="${e}"]`)){t();return}let c=document.createElement("script");c.src=e,c.onload=t,c.onerror=a,document.head.appendChild(c)})}}