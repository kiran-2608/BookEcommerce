import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Admin({ darkMode }) {

const [books, setBooks] = useState([]);
const [editingId, setEditingId] = useState(null);

const [events, setEvents] = useState([]);
const [editingEventId, setEditingEventId] = useState(null);

const [bookData, setBookData] = useState({
title:"",
author:"",
category:"",
price:"",
rating:"",
image:""
});

const [eventData, setEventData] = useState({
title:"",
date:"",
time:"",
location:"",
image:"",
description:""
});


// ================= FETCH =================
useEffect(() => {
fetchBooks();
fetchEvents();
}, []);

const fetchBooks = async () => {
try {
const res = await axios.get("http://localhost:5000/api/books");
setBooks(res.data.books);
} catch (err) {
console.log(err);
}
};

const fetchEvents = async () => {
try {
const res = await axios.get("http://localhost:5000/api/events");
setEvents(res.data.events);
} catch (err) {
console.log(err);
}
};


// ================= BOOK =================
const handleBook = async () => {
try {
if (editingId) {
await axios.put(
`http://localhost:5000/api/books/update/${editingId}`,
bookData
);
toast.success("Book updated ✏️");
setEditingId(null);
} else {
await axios.post(
"http://localhost:5000/api/books/add",
bookData
);
toast.success("Book added 📚");
}

setBookData({
title:"",author:"",category:"",price:"",rating:"",image:""
});

fetchBooks();

} catch {
toast.error("Error");
}
};

const deleteBook = async (id) => {
try {
await axios.delete(`http://localhost:5000/api/books/delete/${id}`);
toast.success("Book deleted ❌");
fetchBooks();
} catch {
toast.error("Delete failed");
}
};

const editBook = (book) => {
setEditingId(book._id);
setBookData(book);
};


// ================= EVENT =================
const handleEvent = async () => {
try {

if (editingEventId) {
await axios.put(
`http://localhost:5000/api/events/update/${editingEventId}`,
eventData
);
toast.success("Event updated ✏️");
setEditingEventId(null);
} else {
await axios.post(
"http://localhost:5000/api/events/add",
eventData
);
toast.success("Event added 🎉");
}

setEventData({
title:"",date:"",time:"",location:"",image:"",description:""
});

fetchEvents();

} catch {
toast.error("Event error");
}
};

const deleteEvent = async (id) => {
try {
await axios.delete(`http://localhost:5000/api/events/delete/${id}`);
toast.success("Event deleted ❌");
fetchEvents();
} catch {
toast.error("Delete failed");
}
};

const editEvent = (event) => {
setEditingEventId(event._id);
setEventData(event);
};


// ================= UI =================
return (
<div style={{
padding:"20px",
background: darkMode ? "#111827" : "#f5f7fb",
minHeight:"100vh"
}}>

<h1 style={{ color: darkMode ? "white" : "#111" }}>
⚙️ Admin Dashboard
</h1>

{/* BOOKS */}
<div style={{ ...card, background: darkMode ? "#1f2937" : "white" }}>
<h2>📚 Books</h2>

<input placeholder="Title" value={bookData.title}
onChange={(e)=>setBookData({...bookData,title:e.target.value})} style={inputStyle} />

<input placeholder="Author" value={bookData.author}
onChange={(e)=>setBookData({...bookData,author:e.target.value})} style={inputStyle} />

<input placeholder="Category" value={bookData.category}
onChange={(e)=>setBookData({...bookData,category:e.target.value})} style={inputStyle} />

<input placeholder="Price" value={bookData.price}
onChange={(e)=>setBookData({...bookData,price:e.target.value})} style={inputStyle} />

<input placeholder="Rating" value={bookData.rating}
onChange={(e)=>setBookData({...bookData,rating:e.target.value})} style={inputStyle} />

<input placeholder="Image URL" value={bookData.image}
onChange={(e)=>setBookData({...bookData,image:e.target.value})} style={inputStyle} />

<button onClick={handleBook} style={buttonStyle}>
{editingId ? "Update Book" : "Add Book"}
</button>

</div>


{/* BOOK LIST */}
<div style={{ ...card, background: darkMode ? "#1f2937" : "white" }}>
<h2>📖 Books</h2>

<div style={grid}>
{books.map(book => (
<div key={book._id} style={itemCard(darkMode)}>

<img src={book.image} style={img}/>

<h3>{book.title}</h3>
<p>{book.author}</p>

<div style={{display:"flex", gap:"10px"}}>
<button onClick={()=>editBook(book)} style={editBtn}>Edit</button>
<button onClick={()=>deleteBook(book._id)} style={deleteBtn}>Delete</button>
</div>

</div>
))}
</div>
</div>


{/* EVENTS */}
<div style={{ ...card, background: darkMode ? "#1f2937" : "white" }}>
<h2>🎉 Events</h2>

<input placeholder="Title" value={eventData.title}
onChange={(e)=>setEventData({...eventData,title:e.target.value})} style={inputStyle} />

<input placeholder="Date" value={eventData.date}
onChange={(e)=>setEventData({...eventData,date:e.target.value})} style={inputStyle} />

<input placeholder="Time" value={eventData.time}
onChange={(e)=>setEventData({...eventData,time:e.target.value})} style={inputStyle} />

<input placeholder="Location" value={eventData.location}
onChange={(e)=>setEventData({...eventData,location:e.target.value})} style={inputStyle} />

<input placeholder="Image URL" value={eventData.image}
onChange={(e)=>setEventData({...eventData,image:e.target.value})} style={inputStyle} />

<textarea placeholder="Description" value={eventData.description}
onChange={(e)=>setEventData({...eventData,description:e.target.value})} style={inputStyle} />

<button onClick={handleEvent} style={buttonStyle}>
{editingEventId ? "Update Event" : "Add Event"}
</button>
</div>


{/* EVENT LIST */}
<div style={{ ...card, background: darkMode ? "#1f2937" : "white" }}>
<h2>🎟 Events</h2>

<div style={grid}>
{events.map(event => (
<div key={event._id} style={itemCard(darkMode)}>

<img src={event.image} style={img}/>

<h3>{event.title}</h3>
<p>📅 {event.date} | ⏰ {event.time}</p>
<p>📍 {event.location}</p>
<p>{event.description}</p>

<div style={{display:"flex", gap:"10px"}}>
<button onClick={()=>editEvent(event)} style={editBtn}>Edit</button>
<button onClick={()=>deleteEvent(event._id)} style={deleteBtn}>Delete</button>
</div>

</div>
))}
</div>
</div>

</div>
);
}


// ================= STYLES =================
const card = {
padding:"15px",
marginBottom:"20px",
borderRadius:"12px"
};

const inputStyle = {
width:"100%",
padding:"10px",
marginBottom:"10px",
borderRadius:"8px",
border:"1px solid #ddd"
};

const buttonStyle = {
width:"100%",
padding:"10px",
background:"#6a11cb",
color:"white",
border:"none",
borderRadius:"10px"
};

const grid = {
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"15px"
};

const itemCard = (darkMode) => ({
padding:"10px",
borderRadius:"10px",
background: darkMode ? "#374151" : "#fff",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
});

const img = {
width:"100%",
height:"120px",
objectFit:"cover",
borderRadius:"8px"
};

const editBtn = {
flex:1,
padding:"8px",
background:"#2575fc",
color:"white",
border:"none",
borderRadius:"6px"
};

const deleteBtn = {
flex:1,
padding:"8px",
background:"#e74c3c",
color:"white",
border:"none",
borderRadius:"6px"
};

export default Admin;