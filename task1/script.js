function studentCrud() {
    return {
        addMode: true,
        id: '',
        form: {
            name: '',
            email: '',
        },
        students: [{
            name: 'test',
            email: 'test@mail.com'
        }],
        saveData() {
            if (this.form.name.length && this.form.email.length) {
                this.students.push({
                    name: this.form.name,
                    email: this.form.email
                })
                this.resetForm()
            }
        },
        editData(student, index) {
            this.addMode = false
            this.form.name = student.name
            this.form.email = student.email
            this.id = index
        },
        updateData() {
            if (this.form.name.length && this.form.email.length) {
                this.students.splice(this.id, 1, {
                    name: this.form.name,
                    email: this.form.email,
                })
                this.resetForm()                    
            }
        },
        deleteData(index) {
            this.students.splice(index, 1)
        },
        cancelEdit(){
            this.resetForm()
        },
        resetForm() {
            this.form.name = ''
            this.form.email = ''
            this.addMode = true
        }
    }
}
