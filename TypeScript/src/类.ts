class Menu {
	items: Array<string>;
	pages: number;

	constructor(item_list: Array<string>, total_page: number) {
		this.items = item_list;
		this.pages = total_page
	}

	/**
	 * list 遍历方法
	 */
	list(): void {
		console.log('our menu for today')
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			console.log(item)
		}
	}
}

var	todayMenu = new Menu([
	"packages", "orange juicd"
], 1)

todayMenu.list();