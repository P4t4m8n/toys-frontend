


const TOYS_KEY = 'toysDB'

// const PAGE_SIZE = 8
_createToys()



import { asyncService } from './async-storage.service.js'
export const toyService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getEmptyToy,

}


function query(filterSortBy) {
    const { name, inStock, byLabel, sortBy } = filterSortBy

    return asyncService.query(TOYS_KEY)
        .then(toys => {
            if (name) {
                const regex = new RegExp(name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (inStock === 'inStock') {
                toys = toys.filter(toy => toy.inStock)
            }

            if (inStock === 'notInStock') {
                toys = toys.filter(toy => !toy.inStock)
            }

            if (byLabel) {
                byLabel.forEach(label => {
                    toys.filter(toy => { toy.labels.some(label) })
                })
            }

            if (sortBy === 'price') {
                toys.sort((toyA, toyB) => toyA.price - toyB.price)
            }
            if (sortBy === 'createdAt') {
                toys.sort((toyA, toyB) => toyA.createdAt - toyB.createdAt)
            }

            if (sortBy === 'name') {
                toys.sort((toyA, toyB) => toyA.name.localeCompare(toyB.name))
            }

            return toys
        })

}


function getById(toyId) {
    return asyncService.get(TOYS_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return asyncService.put(TOYS_KEY, toy).then((savedToy) => {
            return savedToy
        })
    } else {
        return asyncService.post(TOYS_KEY, toy).then((savedToy) => {
            return savedToy
        })
    }
}

function remove(toyId) {
    return asyncService.remove(TOYS_KEY, toyId).then(() => {
    })
}

function getDefaultFilter() {
    return {
        name: '', inStock: 'all', byLabel: [], sortBy: 'name'
    }
}

function getEmptyToy() {
    return {
        name: "",
        price: 0,
        labels: [],
        inStock: false,
    }
}



function _createToys() {
    let toys = loadFromStorage(TOYS_KEY)

    if (!toys || !toys.length) {
        toys = [
            {
                "_id": "t101",
                "name": "Talking Doll",
                "price": 123,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Colorful Blocks",
                "price": 29.99,
                "labels": ["Educational", "Building Blocks", "Kids"],
                "createdAt": 1631031812345,
                "inStock": true
            },
            {
                "_id": "t103",
                "name": "Interactive Teddy Bear",
                "price": 89.95,
                "labels": ["Teddy Bear", "Interactive", "Cuddly"],
                "createdAt": 1631031823456,
                "inStock": false
            },
            {
                "_id": "t104",
                "name": "Puzzle Play Mat",
                "price": 49.99,
                "labels": ["Play Mat", "Puzzle", "Toddler"],
                "createdAt": 1631031834567,
                "inStock": true
            },
            {
                "_id": "t105",
                "name": "Musical Mobile",
                "price": 34.5,
                "labels": ["Baby Gear", "Musical", "Crib"],
                "createdAt": 1631031845678,
                "inStock": true
            },
            {
                "_id": "t106",
                "name": "Artistic Coloring Book",
                "price": 14.99,
                "labels": ["Coloring Book", "Artistic", "Children"],
                "createdAt": 1631031856789,
                "inStock": true
            },
            {
                "_id": "t107",
                "name": "Remote Control Car",
                "price": 59.99,
                "labels": ["Toy Car", "Remote Control", "Kids"],
                "createdAt": 1631031867890,
                "inStock": false
            },
            {
                "_id": "t108",
                "name": "Plush Animal Backpack",
                "price": 19.95,
                "labels": ["Backpack", "Plush", "Travel"],
                "createdAt": 1631031878901,
                "inStock": true
            },
            {
                "_id": "t109",
                "name": "Building and Construction Set",
                "price": 69.99,
                "labels": ["Construction Set", "Building Blocks", "Educational"],
                "createdAt": 1631031889012,
                "inStock": true
            },
            {
                "_id": "t110",
                "name": "Wooden Alphabet Puzzle",
                "price": 24.99,
                "labels": ["Puzzle", "Alphabet", "Educational"],
                "createdAt": 1631031890123,
                "inStock": false
            },
            {
                "_id": "t111",
                "name": "Rattle and Teething Toy",
                "price": 9.99,
                "labels": ["Baby Toy", "Rattle", "Teething"],
                "createdAt": 1631031901234,
                "inStock": true
            },
            {
                "_id": "t112",
                "name": "Educational Flash Cards",
                "price": 18.5,
                "labels": ["Flash Cards", "Educational", "Learning"],
                "createdAt": 1631031912345,
                "inStock": true
            },
            {
                "_id": "t113",
                "name": "Soft Baby Blanket",
                "price": 27.99,
                "labels": ["Baby Blanket", "Soft", "Cuddly"],
                "createdAt": 1631031923456,
                "inStock": false
            },
            {
                "_id": "t114",
                "name": "Science Experiment Kit",
                "price": 39.99,
                "labels": ["Science Kit", "Experiment", "Learning"],
                "createdAt": 1631031934567,
                "inStock": true
            },
            {
                "_id": "t115",
                "name": "Remote-Controlled Helicopter",
                "price": 79.99,
                "labels": ["Helicopter", "Remote Control", "Outdoor"],
                "createdAt": 1631031945678,
                "inStock": true
            },
            {
                "_id": "t116",
                "name": "Stuffed Penguin Plush Toy",
                "price": 12.95,
                "labels": ["Stuffed Toy", "Penguin", "Cute"],
                "createdAt": 1631031956789,
                "inStock": true
            },
            {
                "_id": "t117",
                "name": "Memory Matching Game",
                "price": 15.99,
                "labels": ["Memory Game", "Matching", "Kids"],
                "createdAt": 1631031967890,
                "inStock": false
            },
            {
                "_id": "t118",
                "name": "Bath Time Rubber Duck",
                "price": 6.99,
                "labels": ["Rubber Duck", "Bath Toy", "Baby"],
                "createdAt": 1631031978901,
                "inStock": true
            },
            {
                "_id": "t119",
                "name": "Toy Kitchen Playset",
                "price": 49.95,
                "labels": ["Playset", "Kitchen", "Imaginative Play"],
                "createdAt": 1631031989012,
                "inStock": true
            },
            {
                "_id": "t120",
                "name": "Dinosaur Puzzle",
                "price": 22.5,
                "labels": ["Puzzle", "Dinosaur", "Children"],
                "createdAt": 1631031990123,
                "inStock": false
            }
        ]

        saveToStorage(TOYS_KEY, toys)

    }
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val);
}


export const storageService = {
    loadFromStorage,
    saveToStorage

}


