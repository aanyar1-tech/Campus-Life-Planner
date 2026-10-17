const STORAGE_KEY= `simple_planner_records`;
let state ={
    records: JSON.parse(localStorage.getItem(STORAGE_KEY)) ||[
        { id: "rec_1", description: "Review chemistry exam topics", amount: 120, category: "Study", date: "2026-10-16"},
        { id: "rec_2", description: "Lab presentation group sync", amount: 45,category: "class", date:"2026-10-17"}
    ],
        currentTab: 'dashboard',
        timeTarget: 180,
        isCaseSensitive: false,
        editingId: null
};
function saveTolocaIstorage(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state.records));
}
 function validateFormInput(description, amount,date){ 
    const descRegex=/^\s(?:.*\s)?$/; // No loose leading/trailing spaces
    const amountRegex= /^(0\[1-9]\d*)$/;//whole number only
    const dateRegex =/^\d{4}-(0[1-9]|1[0-2])-(0[1-9])|d3[01])\$/;//YYY-MM-DD
if (!descRegex.test(description)) return false;
if (!amountRegex.test(amount)) return false
if (!dateRegex.test(date)) return false;
    return true;
 }//
    function renderApp(){
        //stat dashboard updater
        const records = state.records;
        document.getElementByTd(`stat-count').textcontent = records.length;
        let totalmins=0
        let categorycount={};
        records.forEach (item=>{
         totalmins+= parseInt(item.amount);
        categorycounts[item.category]=(categorycounts[item.category]||0+1
    });
    document.getElementById('stat-sum').textcontent=totalmins;
    let topcategory= "N/A";
    let maxcount=0;
    for(let cat in categorycounts){
        if (categorycounts[cat]>maxcount){maxcount=categorycounts[cat];} topcategory=cat;}
    }
    document .grtElementById('sts-top').textcount=topcateroy;
    const remaining= state.timeTarget-toatlmins;
    const statustext=document.getElementById('stat-cap-status' );
    const alerRegion=document.getElemenrById( 'aler-region');
    if (remaining >=0){
        statustext.textcontent='Remainung:${remaining} mins' ;
        statustext.className="cap-msg safe";
        alerRegion.textcontent= "";
     } else {
        statustext.textcontent='over cap: ${Math.abs(remainig)}mins';
        statustext.className="cap-msg warning";
        alerRegion.textcontent='Aler! Passed your study target!';
     }
     // Ledger rendderer
     const tbody=document.querySelector('tabletbody')
     if(!tbody)return;
     tbody.innerHTML='';
     let sorted=[...state.records];
     conts sortVal=document.getElementById('sort-select')?.value||'date-desc';
     if(sortVal==='date-desc') sorted.sort((a,b)=>new Date(b.date)-newDate(a.date));
     if(sortVal==='date-asc')sorted.sort(a,b)=>new Date(a.date)-new Date(b.date));
     if(sortVal==='amount-desc')sortedRecords.sort(a,b)=>-b.amount-a.amount);
     if(sortVal==='amount-asc')sortedRecords.sort(a,b)=>-b.amount);
     const searchInput=document.getElementById('search-input')?.value||'';
     let searchRegex=null;
     if(searchInput){
         try{
            searchRegex=new RegExp(searchInput,state.isCasensitive?'':'i');
         }catch(e){searchRegex=null;}
        }
        let matchcount=0;
        sortedRecords.forEach(item)=>{ 
            const hasDuplicateWord=/\b(\w+)\s+\\1\\b","i").test(item.description);
            if(searchRegex && !searchRegex.test(item.description)&& !searchRegex.test(item.category))return;
            matchcount++;
           let descText=item.description;
           if(searchRegex)descText=descText.replace(searchRegex,match=>'mark>${match}</mark>');
       const row=document.createElement('tr');
       row.innerHTML='
       <td> ${item.date}</td>
       <td> ${descText } ${hasDuplicateWord ?'':''}</td>
       <td> ${item.category}</td>
       <td>$${parseFloat(item.amount).toFixed(2)}</td>
       </td>
       tbody.appendChild(row);
        })
        document.getElementById('no-records').className=match===0 ?``:'hidden';
    window.switchTab=function(tabId){
        document.querySelectorAll(`.app-section`).forEach(s=> s.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
        document.querySelectorAll(`.nav-link`)
        .forEach(l=>{
            l.classlist.remove('active');
            if(l.getAttribute('href')==='#'+tabId){l.classlist.add('active');
            }
        });
    };
   widow.updateBudgetCap=function(){
     state.budgetCap=parseFlot(document.getElementById('cap-input').value)||0;
     iupdateDashboardStats();
    };
    window.toggleCase=function(){
        state.isCasesensitive=!state.isCaseSensivtive;
        renderTableRecords();
    };
    window.handlesort=function(){renderTableRecords();};
    document.getElemantById('search-input')?.addEventListener('input', renderTableRecords);
    document.getElementById('transcation-form')?.addEventListener('submit',(e)=>{
        e.preventDefault();
        const desc=document.getElementryById('form-desc').value;
        const amountstr=document.getElementById('form-amount').value;
        const cat=document.getElementById('form-category').value;
        const date= newDate().toISOString().split('T')[0];
        if(!validateFormInputs(desc,amount,date,cat)){
            alerRegion("validation failed! Please review inputs.");
            return;
        }
        if(state.edittingId){
            state.records=state.record.map(r=>r.id===state.edittingId? {...r,description:desc,amount:parseFloat(amountstr),category:cat} : r);
            state.edittingId=null;
            document.getElementById('submit-btn').textcontent="Save Financial Entry";
        }else{
            state.records.push({id: "rec_"+Date.now(),description:desc, amount:parseFloat(amountstr),category:cat,date:date});
        }
        saveToLocalStorage();
        document.getElementById('transaction-form').reset();
        renderApp();
    });
    window.handleDelete=function(id){
        if(confirm("Delete this entry?")){
            state.records=state.records.filter(r=>r.id!==id);
            saveToLocalStorage();
            renderApp();
        };
         window.handleEdit=function(id){
        const item=state.records.find(r=>r.id===id);
        if(!item)return;
        state.editingId=id;
        window.switchTab('form-section`);
        document.getElementById('form-desc').value=item.description;
        document.getElementById('form-amount').value=item.amount;
        document.getElementById('form-category').value=item.category;
        document.getElementById('submit-btn').textContent="Update Record";
    };


