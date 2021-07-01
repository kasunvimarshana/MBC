LoadMoreRandomData = () =>{
    this.setState({
        page:this.state.page+1
    },()=>this.LoadRandomData())
}

(
    <FlatList
        data={this.state.randomUserData}
        renderItem={this.renderCustomItem}
        style={{ width: 350, height: 800 }}
        keyExtractor={this.keyExtractor}
    />
)