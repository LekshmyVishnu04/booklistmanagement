import React, { useState } from "react"




function Booklist() {


    const [Books, setBooks] = useState([]);

    const [BookName, setBookName] = useState("");
    const [AuthorName, setAuthorName] = useState("");
    const [PublishDate, setPublishDate] = useState("");

    const [editingItemId, setEditingItemId] = useState(null);
    const [editedBookName, setEditedBookName] = useState("");
    const [editingAuthorName, setEditingAuthorName] = useState("");
    const [editedPublishDate, setEditedPublishDate] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const handleBookChange = (e) => {
        setBookName(e.target.value)
    }

    const handleAuthorChange = (e) => {
        setAuthorName(e.target.value)
    }

    const handleDateChange = (e) => {
        setPublishDate(e.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (BookName.trim() === "") {
            alert("Book name cannot be empty");
            return;
        }
        var x = Books.length + 1;
        var newBook = {
            id: x,
            name: BookName,
            author: AuthorName,
            pdate: PublishDate
        }
        setBooks([...Books, newBook])
        setBookName('')
        setAuthorName('')
        setPublishDate('')
    }

    const handleEditBook = (book) => {
        setEditingItemId(book.id);
        setEditedBookName(book.name);
        setEditingAuthorName(book.author);
        setEditedPublishDate(book.pdate);
    };

    const handleSaveItem = () => {
        if (editedBookName.trim() !== "") {
            const updatedItems = Books.map((book) => {
                if (book.id === editingItemId) {
                    return {
                        ...book, name: editedBookName,
                        author: editingAuthorName, pdate: editedPublishDate
                    };
                }
                return book;
            });
            setBooks(updatedItems);
            setEditingItemId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditedBookName("");
        setEditingAuthorName("");
        setEditedPublishDate("");
    };

    const handleDeleteBook = (id) => {
        const filteredItems = Books.filter((book) => book.id !== id);
        setBooks(filteredItems);
    };


    const filteredBooks = Books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );





    return (
        <div>

            <div id="container">
                <h1>Book List Management</h1>
            </div>


            <div id="container">
                <h3>Add New Book</h3>
                <div className="row" >
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} >
                            <p><label> Book  Name </label><input type="text" placeholder="Book Name" onChange={handleBookChange} />
                            </p>
                            <p> <label> Author Name </label><input type="text" placeholder="Author Name" onChange={handleAuthorChange} />
                            </p>
                            <p><label> Publish Date </label><input type="date" placeholder="Publish Date" onChange={handleDateChange} />
                            </p>
                            <p><button className="btn btn-small btn-success" type="submit" > Add </button>
                            </p>  </form>
                    </div>
                </div>
            </div>
            <div id="container">
                <h2>Available books</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={handleSearch}>
                                <label>Search Book/Author Name: </label>
                                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                                <button className="btn btn-small btn-success" type="submit">Search</button>&nbsp;
                            </form>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Publish Date</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (

                            filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>
                                        {editingItemId === book.id ? (
                                            <input
                                                type="text"
                                                value={editedBookName}
                                                onChange={(e) => setEditedBookName(e.target.value)}
                                            />
                                        ) :
                                            (book.name)
                                        }</td>
                                    <td>
                                        {editingItemId === book.id ? (
                                            <input
                                                type="text"
                                                value={editingAuthorName}
                                                onChange={(e) => setEditingAuthorName(e.target.value)}
                                            />
                                        ) :
                                            (book.author)}</td>
                                    <td>
                                        {editingItemId === book.id ? (
                                            <input
                                                type="date"
                                                value={editedPublishDate}
                                                onChange={(e) => setEditedPublishDate(e.target.value)}
                                            />
                                        ) :
                                            (
                                                book.pdate)}</td>
                                    <td>
                                        {editingItemId === book.id ? (
                                            <>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleSaveItem}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )

                                            : <button
                                                className="btn btn-primary"
                                                onClick={() => (handleEditBook(book))}
                                            >
                                                Edit
                                            </button>
                                        }</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => (handleDeleteBook(book.id))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>))

                        ) :
                            (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No books found
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Booklist