import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Register from './Components/Register';


import Admin from "./Admin/Admin";
import ViewCustomer from "./Admin/ViewCustomer";
import ViewTrainer from "./Admin/ViewTrainer";
import ViewPayment from "./Admin/ViewPayment";
import ViewAllMachines from "./Admin/ViewAllMachines";
import EditMachine from "./Admin/EditMachine";
import ViewPlans from "./Admin/ViewPlans";
import EditPlan from "./Admin/EditPlan";
import EditTrainer from "./Admin/EditTrainer";


import Customer from "./Customer/Customer";
import EditProfile from "./Customer/EditProfile";
import ViewAsignedTrainer from "./Customer/ViewAsignedTrainer";
import Membership from "./Customer/Membership";
import DietPlan from "./Customer/DietPlan";
import Payment from "./Customer/Payment";

import Trainer from "./Trainer/Trainer";
import ViewAssignedCustomers from "./Trainer/ViewAssignedCustomers";
import AddCustomer from "./Trainer/AddCustomer";
import ViewMachine from "./Trainer/ViewMachine";
import EditMachineT from "./Trainer/EditMachineT";




function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/viewCustomer" element={<ViewCustomer/>}></Route>
        <Route path="/admin/viewTrainer" element={<ViewTrainer/>}></Route>
        <Route path="/admin/viewPayment" element={<ViewPayment/>}></Route>
        <Route path="/admin/viewMachines" element={<ViewAllMachines/>}></Route>
        <Route path="/admin/viewplans" element={<ViewPlans/>}></Route>
        <Route path="/admin/editmachine/:id" element={<EditMachine/>}></Route>
        <Route path="/admin/editplan/:id" element={<EditPlan/>}></Route>        
        <Route path="/admin/edittrainer/:id" element={<EditTrainer/>}></Route>

        <Route path="/trainer" element={<Trainer/>}></Route>
        <Route path="/trainer/viewCustomer" element={<ViewAssignedCustomers/>}></Route>
        <Route path="/trainer/addcustomer" element={<AddCustomer/>}></Route>
        <Route path="/trainer/viewmachines" element={<ViewMachine/>}></Route>
        <Route path="/trainer/editmachine/:id" element={<EditMachineT/>}></Route>

        <Route path="/customer" element={<Customer/>}></Route>
        <Route path="/customer/editprofile" element={<EditProfile/>}></Route>
        <Route path="/customer/viewtrainer" element={<ViewAsignedTrainer/>}></Route>
        <Route path="/customer/membership" element={<Membership/>}></Route>
        <Route path="/customer/dietplan" element={<DietPlan/>}></Route>
        <Route path="/customer/payment" element={<Payment/>}></Route>

        </Routes>
        </Router>
    </div>
  );
}

export default App;
