import React, { useState } from 'react'

function useDialog() {
    const [userDialogForm, setUserDialogForm] = useState({isOpen: false, title: '', type: ''})
    return [userDialogForm, setUserDialogForm]
}

export default useDialog
