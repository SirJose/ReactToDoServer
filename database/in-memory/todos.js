
let lastId = 1;
const todosList = [
    {
        codigo: lastId,
        texto: "Ordenar mi cuarto",
        estado: "completado",
    }
];

const all           = ()                =>  Promise.resolve(todosList);
const filtroTexto   = (filtro)          =>  Promise.resolve(todosList.filter(t => t.texto.indexOf(filtro) >= 0));
const filtroEstado  = (filtro)          =>  Promise.resolve(todosList.filter(t => t.estado.indexOf(filtro) >= 0));
const add           = (todo)            =>  {
                                                lastId++;
                                                const newTodo = {...todo, codigo: lastId };
                                                todosList.push(newTodo);
                                                return Promise.resolve(newTodo);
                                            };
const single        = (codigo)          =>  Promise.resolve(todosList.find(t => t.codigo === codigo));
const update        = (codigo, todo)    =>  {
                                                const old = todosList.find(t => t.codigo === codigo);
                                                if(!old){
                                                    throw Promise.reject("No existe ningun To-Do con codigo " + codigo);
                                                }
                                                const index = todosList.indexOf(old);
                                                const nuevoToDo = todosList[index] = {...todo, codigo };
                                                return Promise.resolve(nuevoToDo);
                                            };
const remove        = (codigo)          =>  {
                                                const todo = todosList.find(t => t.codigo === codigo);
                                                if(!todo){
                                                    throw Promise.reject("No existe ningun To-Do con codigo " + codigo);
                                                }
                                                const index = todosList.indexOf(todo);
                                                todosList.splice(index, 1);
                                                return Promise.resolve(todo);
                                            }

const todos = {
    all, 
    filtroTexto,
    filtroEstado,
    add,
    single,
    update,
    remove
}

export default todos;