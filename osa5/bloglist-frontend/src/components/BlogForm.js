import React from 'react'

const blogForm = ({onSubmit, handleChange, newTitle, newUrl, newAuthor}) => (
    <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={onSubmit}>
            <div>
                Title
        <input
                    name="newBlog"
                    value={newTitle}
                    onChange={handleChange}
                />
            </div>
            <div>
                Author
        <input
                    name="newAuthor"
                    value={newAuthor}
                    onChange={handleChange}
                /></div>
            <div>
                Url
        <input
                    name="newUrl"
                    value={newUrl}
                    onChange={handleChange}
                /></div>
            <button type="submit">Tallenna</button>
        </form>
    </div>
)

export default blogForm