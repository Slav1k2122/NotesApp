let colors = ['#970FF2','#0597F2','#49D907','#EAF205','#F24607'];
let no_note_tag = document.getElementById('no_note');

function getColor(colorsArr) {
    return colorsArr[Math.floor(Math.random() * colorsArr.length)]
};

function hideNoNoteInfoTag (){
    no_note_tag.style.display = "none"
}

function childrenLength() {
    if(wrapper.children.length === 0){ 
        console.log('nonote');
        no_note_tag.style.display = "block"
    }
}

function createHtml(notesArr){
    notesArr.map((note)=>{
        document.getElementById('wrapp_notes').insertAdjacentHTML('afterbegin',
        `
        <div class="wrapp_note" id=${note.id}>
            <div class="note"  style="background-color: ${getColor(colors)};">
                <p>
                    ${note.title}
                </p>
            </div>
            <img class="delete" src="delete.png" alt="">
        </div>
        `)
    });
}

let notesArr = JSON.parse(localStorage.getItem('notes')) ||  [];

if(notesArr.length > 0){ 
    hideNoNoteInfoTag()
    createHtml(notesArr)
}

let ok = document.querySelector('.ok')

ok.addEventListener('click', function(){
    let a = document.querySelector('#inp_note').value
    let today = new Date();
    let  uniq_id = today.getTime();

    hideNoNoteInfoTag()
    document.getElementById('wrapp_notes').insertAdjacentHTML('afterbegin',
        `
        <div class="wrapp_note" id=${uniq_id}>
            <div class="note"  style="background-color: ${getColor(colors)};">
                <p>
                    ${a}
                </p>
            </div>
            <img class="delete" src="./delete.png" alt="delete">
        </div>
    `)

    notesArr.push({title:a, id: uniq_id}) 
    localStorage.setItem('notes',  JSON.stringify(notesArr));
})


function addEventListenerToHTMLElements(){
    let wrapper = document.querySelector("#wrapp_notes");

    wrapper.addEventListener('click', function(e){

        if(e.target.className === 'delete'){
            let partentEl = e.target.parentElement;

            let deletedNoteId = partentEl.id;  // получить айди удаляемого елемента

            notesArr = notesArr.filter(note => note.id !== +deletedNoteId);
            
            localStorage.setItem('notes', JSON.stringify(notesArr))

            wrapper.replaceChildren();

            createHtml(notesArr)

            
            childrenLength()
        }
    })
}


addEventListenerToHTMLElements()
