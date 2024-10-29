type UserRole = {

  id?: number,
  name?: string,
  capabilities?: string,
  description?: string,
  status?: string

  // constructor(data: Partial<UserRole>) {
  //     this.id = data.id;
  //     this.name = data.name;
  //     this.capabilities = data.capabilities;
  //     this.description = data.description;
  //     this.status = data.status;
  // }
  //
  // // incomplete
  // toJson() {
  //     return {
  //         id: this.id,
  //         name: this.name,
  //     };
  // }
}

export default UserRole;
