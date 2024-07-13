import React, { useState } from 'react';
import './Pcp.css';

function Pcp() {
  const [amount, setAmount] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');
  const [comments, setComments] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const submitAmount = (e) => {
    e.preventDefault();
    if (amount) {
      setApprovalMessage(`Amount entered: INR ${amount}`);
    } else {
      setApprovalMessage('Please enter a valid amount.');
    }
  };

  const approveAmount = (e) => {
    e.preventDefault();
    let message = `Amount approved.`;
    if (comments) {
      message += ` Comments: ${comments}`;
    }
    setApprovalMessage(message);
  };

  return (
    <div className="App">
      <form>
        <h1>Assessment Committee Proceedings</h1>
        <table>
          <tbody>
            <tr>
              <td><strong>Cash award maybe given</strong></td>
              <td>
                <input type="radio" name="radio" id="opt1" />
                <label htmlFor="opt1" className="label1">
                  <span>YES</span>
                </label>
                <input type="radio" name="radio" id="opt2" />
                <label htmlFor="opt2" className="label2">
                  <span>NO</span>
                </label>
              </td>
            </tr>
            <tr>
              <td><strong>Amount of cash award recommended</strong></td>
              <td id="amountCell">
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter amount (INR)"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
                <button onClick={submitAmount}>Submit</button>
                <p id="approvalMessage" style={{ color: amount ? 'blue' : 'red' }}>
                  {approvalMessage}
                </p>
                {amount && (
                  <button id="approveButton" onClick={approveAmount} style={{ display: 'inline-block' }}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td><strong>Enter the Remarks/Comments(if any)</strong></td>
              <td id="remarksCell">
                <textarea
                  id="comments"
                  placeholder="Enter remarks/comments (if any)"
                  rows="4"
                  cols="50"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td id="uploadCell">
                <label><strong>Supporting document for Scopus indexing of article (if exists):</strong></label>
                <input type="file" id="scopusDoc" />
                <br /><br />
                <label><strong>Supporting document for Impact Factor of article (if exists):</strong></label>
                <input type="file" id="impactFactorDoc1" />
                <br /><br />
                <label><strong>Supporting document for Impact Factor of article (if exists):</strong></label>
                <input type="file" id="impactFactorDoc2" />
                <br /><br />
                <label><strong>Any other relevant document (if any):</strong></label>
                <input type="file" id="otherDoc" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Pcp;
