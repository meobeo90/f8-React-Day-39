import { useDispatch, useSelector } from '@/libs/react-redux'
import { ADD_TODO, EDIT_TODO, DELETE_TODO } from '@/store/constants';
import Modal from '@/components/Modal';
import 
{ OPEN_WARNING, CLOSE_WARNING,
  OPEN_DELETE, CLOSE_DELETE,
  OPEN_EDIT, CLOSE_EDIT, SET_EDIT_VALUE } 
  from '@/store/constants';

export default function TodoApp() {
  const todos = useSelector((state) => state.todos);
  const modal = useSelector((state) => state.modal);
  console.log(modal);
  
  const dispatch = useDispatch();

  const escapeHTML = (str) => str.replace(/[<>&"'`]/g, "");

//   Thêm Todo mới
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.todo;
    const value = escapeHTML(input.value.trim());

    if (!value) {
      dispatch({
        type: OPEN_WARNING, payload:"Please enter a todo item"
      })
      return;
    }

    if (todos.some((todo) => todo.title.toLowerCase() === value.toLowerCase())) {
        dispatch({
        type: OPEN_WARNING, payload:"This todo already exists!"
      })
      return;
    }

    dispatch({
      type: ADD_TODO, payload: value,
    });

    form.reset();
  };
// Edit Todo
const handleEdit = (todo) => {
    dispatch({
        type: OPEN_EDIT, payload: todo
    })
}
  const submitEdit = () => {
    const newTitle = escapeHTML(modal.editValue.trim());
    if (!newTitle) {
        dispatch({
        type: OPEN_WARNING, payload: "Todo title cannot be empty."
    })
    return;
    };

    if (
      todos.some(
        (t) => t.id !== modal.editTodo.id && t.title.toLowerCase() === newTitle.toLowerCase()
      )
    ) {
      dispatch({
        type: OPEN_WARNING, payload: "This todo already exists!"
      })
      return;
    }

    dispatch({
      type: EDIT_TODO,
      payload: { id: modal.editTodo.id, title: newTitle },
    });

    dispatch({type: CLOSE_EDIT})
  };
// Xóa Todo
  const handleDelete = (id) => {
    dispatch({type: OPEN_DELETE, payload: id}) 
  };
  const confirmDelete = () => {
    dispatch({
        type: DELETE_TODO,
        payload: modal.deleteId,
      });
      dispatch({type: CLOSE_DELETE})
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-linear-to-br from-cyan-900 to-slate-900">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/10">
        <h1 className="font-bold text-5xl text-white text-center drop-shadow mb-10">Todo App</h1>

        <form onSubmit={handleSubmit} className="mb-4 flex gap-3">
          <input name="todo" type="text" placeholder="Enter your todo..." className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-zinc-400 outline-none transition focus:ring-1 focus:ring-blue-300" />
          <button
            type="submit"
            className="py-2 px-4 rounded-2xl text-lg font-bold text-white cursor-pointer text-center bg-blue-500 hover:bg-blue-600 transition shadow-md"
          >
            Add Todo
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="text-gray-300 italic text-center">The todo list is empty.</div>
        ) : (
          <ul className='space-y-3'>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between px-4 py-3 bg-white/10 mb-2 gap-5 rounded-xl border border-white/10 shadow-sm"
              >
                <span className="text-white text-lg">{todo.title}</span>

               <div className='flex gap-4'>
                 <button
                  onClick={() => handleEdit(todo)}
                  className="text-amber-300 cursor-pointer hover:text-amber-400 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-400 cursor-pointer hover:text-red-500 transition"
                >
                  Delete
                </button>
               </div>
              </li>
            ))}
          </ul>
        )}
       

      {/* MODAL WARNING */}
      {modal.warning && (
        <Modal
          title="Warning"
          onClose={() => dispatch({ type: CLOSE_WARNING })}
        >
          <p>{modal.warning}</p>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {modal.deleteId && (
        <Modal
          title="Confirm Delete"
          onClose={() => dispatch({ type: CLOSE_DELETE })}
        >
          <p>Are you sure you want to delete this todo?</p>
          <button
            onClick={confirmDelete}
            className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </Modal>
      )}

      {/* MODAL EDIT */}
      {modal.editTodo && (
        <Modal
          title="Edit Todo"
          onClose={() => dispatch({ type: CLOSE_EDIT })}
        >
          <input
            value={modal.editValue}
            onChange={(e) =>
              dispatch({ type: SET_EDIT_VALUE, payload: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />

          <button
            onClick={submitEdit}
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Save
          </button>
        </Modal>
      )}
      </div>
    </div>
  );
}
