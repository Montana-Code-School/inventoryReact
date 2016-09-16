InventoryList = React.createClass({
  render: function(){
    console.log(this.props.data);
    if(typeof this.props.data == 'object'){
      var items = this.props.data.map(function(item){
        item.totalCurrentCost = Math.round(item.totalCurrentQuantity*item.costperUnit*100)/100;
        return (
          <InventoryItem
            partNumber={item.partNumber}
            description={item.description}
            totalCurrentQuantity={item.totalCurrentQuantity}
            unitOfIssue={item.unitOfIssue}
            costperUnit={item.costperUnit}
            totalCurrentCost={item.totalCurrentCost}
            location={item.location}
          />
        );
      });
    }
    return (
      <div>
        <table>
          <tr>
            <th>
              <td>Part Number</td>
              <td>Description</td>
              <td>Quantity</td>
              <td>Unit of Issue</td>
              <td>Unit Cost</td>
              <td>Total Value</td>
              <td>Location</td>
            </th>
          </tr>
          {items}
        </table>
      </div>
    );
  }
});

InventoryItem = React.createClass({
  updatePartNumber: function(){
    
  },
  updateDescription: function(){

  },
  updateUnitOfIssue: function(){

  },
  updateCostPerUnit: function(){

  },
  updateLocation: function(){

  },
  render: function(){
    return (
      <div>
        <tr>
          <td onDoubleClick={this.updatePartNumber}>{this.props.partNumber}</td>
          <td onDoubleClick={this.updateDescription}>{this.props.description}</td>
          <td>{this.props.totalCurrentQuantity}</td>
          <td onDoubleClick={this.updateUnitOfIssue}>{this.props.unitOfIssue}</td>
          <td onDoubleClick={this.updateCostPerUnit}>{this.props.costperUnit}</td>
          <td>{this.props.totalCurrentCost}</td>
          <td onDoubleClick={this.updateLocation}>{this.props.location}</td>
        </tr>
      </div>
    );
  }
});

InventoryPage = React.createClass({
  getItemsFromServer: function() {
    $.ajax({
      method: "GET",
      url: "/part",
      success: function(response) {
        console.log(response);
        this.setState({data: response});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: ''};
  },
  componentDidMount: function() {
    this.getItemsFromServer();
  },
  render: function(){
    return (
      <div>
        <InventoryList data={this.state.data}/>
      </div>
    );
  }
});
