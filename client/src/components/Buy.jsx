import { ethers } from 'ethers';
import React, { useState } from 'react';
const Buy = ({state}) => {

    const {contract} = state;
    console.log(contract);
    const [formData, setFormData] = useState({
        name: '',
        message: '',
        amount: '0',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const buyCoffee = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        const amount = {value:ethers.parseEther(formData.amount)};
    
        try {
            const transaction = await contract.buyCoffe(formData.name,formData.message,amount);
            console.log("processing payment");
            await transaction.wait(1);
            console.log("transcation successfull");
            alert("Transcation is successful");
        } catch (error) {
            console.log(error);
        }

        setFormData({
            name: '',
            message: '',
            amount: 0,
          })
      };
    
      return (
        <div >
          <form className='formPart' onSubmit={buyCoffee}>
            <label style={{marginTop:"20px",marginBottom:"10px",fontSize:"larger"}}>Name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{width:"50%",height:"30px",paddingLeft:"10px",borderRadius:"7px",border:"none"}}
            />
            <label style={{marginTop:"20px",marginBottom:"10px",fontSize:"larger"}}>Message</label>
            <input
              type="text"
              placeholder="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              style={{width:"50%",height:"30px",paddingLeft:"10px",borderRadius:"7px",border:"none"}}
            />
            <label style={{marginTop:"20px",marginBottom:"10px",fontSize:"larger"}}>Amount in Ether</label>
            <input
              type="number"
              placeholder="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              style={{width:"50%",height:"30px",paddingLeft:"10px",borderRadius:"7px",border:"none"}}
            />
            <button type="submit" style={{marginTop:"20px",backgroundColor:"#00eeff42"}}>Pay</button>
          </form>
        </div>
      );
    };

export default Buy;