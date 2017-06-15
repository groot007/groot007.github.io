describe("inputs getValue", function() {
	console.log($(".props-block").inputs("getValue")["main"])
  it("возводит в n-ю степень", function() {
    assert.equal($(".props-block").inputs("getValue")["main"], {
    	className: "className",
    	name:"example"}
    );
    // assert.equal(pow(3, 4), 81);
  });

});