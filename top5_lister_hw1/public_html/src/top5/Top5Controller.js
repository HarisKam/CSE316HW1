/**
 * Top5ListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class Top5Controller {
    constructor() {

    }

    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", ["?","?","?","?","?"]);            
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }

        // SETUP THE ITEM HANDLERS
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);

            // AND FOR TEXT EDITING
            item.ondblclick = (ev) => {
                if (this.model.hasCurrentList()) {
                    // CLEAR THE TEXT
                    item.innerHTML = "";

                    // ADD A TEXT FIELD
                    let textInput = document.createElement("input");
                    textInput.setAttribute("type", "text");
                    textInput.setAttribute("id", "item-text-input-" + i);
                    textInput.setAttribute("value", this.model.currentList.getItemAt(i-1));

                    item.appendChild(textInput);

                    textInput.ondblclick = (event) => {
                        this.ignoreParentClick(event);
                    }
                    textInput.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            this.model.addChangeItemTransaction(i-1, event.target.value);
                        }
                    }
                    textInput.onblur = (event) => {
                        this.model.restoreList();
                    }
                }
            }
        }
    }

    registerListSelectHandlers(id) {
        // FOR SELECTING THE LIST
        
        document.getElementById("top5-list-" + id).onmouseover = (event) => {
            this.model.view.hoverList(id);
        }
        
        document.getElementById("top5-list-" + id).onmouseleave = (event) => {
            this.model.view.unhoverList(id);
        }

        document.getElementById("top5-list-" + id).onmousedown = (event) => {
            this.model.unselectAll();
            let statusBar = document.getElementsByName("top5-statusbar");
            statusBar.innerHTML = "";
            this.model.loadlist(id);
            statusBar.appendChild(document.createTextNode("Top 5 " + this.list.getName()));
            
            

            // GET THE SELECTED LIST
            this.model.loadList(id);
        }
         // FOR EDIT LIST NAME

            let list = document.getElementById("top5-list-" + id);
            list.ondblclick = (ev) => {
                    // CLEAR THE TEXT
                let placeholder = list.innerText;
                   list.innerHTML = "";
    
                    // ADD A TEXT FIELD
                    let textInput = document.createElement("input");
                    textInput.setAttribute("type", "text");
                    textInput.setAttribute("id", "list-card-text-" + id);
                    textInput.setAttribute("value", document.getElementById("top5-list-" + id).getName);
    
                    list.appendChild(textInput);
    
                    textInput.ondblclick = (event) => {
                        this.ignoreParentClick(event);
                    }
                    textInput.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            this.model.addChangeListTransaction(id, event.target.value);
                        }
                    }
                    textInput.onblur = (event) => {
                        this.model.restoreList();
                    }
        }

        // FOR DELETING THE LIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            this.ignoreParentClick(event);
            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE LIST
            let modal = document.getElementById("delete-modal");
            this.listToDeleteIndex = id;
            let listName = this.model.getList(id).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            modal.classList.add("is-visible"); 
        
        }
    }
    
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}