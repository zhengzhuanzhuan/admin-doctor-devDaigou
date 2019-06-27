import Main from '@/components/main'
/**
 * @description 将平级的数据，根据 父级id，整理成 iview中tree的data类似的结构，共tree, cascader使用
 * @param baseArr 平级数据
 * @param parentIdName 父级id的字段名称
 * @param idName  本级id的字段名称
 * @param childrenFn  返回children的内容的方法
 * @param sortName  需排序的字段名
 * @param resultArr 方法中被处理的数组
 * @param isChildren  是否是基础父级数据
 * @param selectedArray  已选中的数组
 * @param selectJudgeName 选中判断所需字段名称
 * @param shouldGetParentNameArr 是否需要设置 父级名称数组
 * @return {Array}
 */
function formatToTreeDataInner ({ baseArr, parentIdName, idName, childrenFn, sortName = '', resultArr = [], isChildren = false, selectedArray = [], selectJudgeName, shouldGetParentNameArr = false }) {
    if (!resultArr.length && !isChildren) {
        const parentBaseArr = []
        baseArr.forEach(item => {
            // parentBaseArr父级数据
            if (item[parentIdName] === '0' || item[parentIdName] === 0 || item[parentIdName] === '') {
                const temp = childrenFn(JSON.parse(JSON.stringify(item)))
                if (selectedArray.length && selectedArray.indexOf(item[selectJudgeName]) !== -1) {
                    temp.selected = true
                }
                parentBaseArr.push(temp)
            }
        })
        if (parentBaseArr.length === baseArr.length) {
            return parentBaseArr
        } else {
            const args = arguments[0]
            args.resultArr = parentBaseArr
            args.isChildren = true
            return formatToTreeDataInner(args)
        }
    } else {
        if (sortName) {
        	// 从小到大排序
            resultArr.sort(function (a, b) {
                return (a[sortName] - b[sortName])
            })
        }
        resultArr.forEach(item => {
            baseArr.forEach(ite => {
                if (item[idName] === ite[parentIdName]) {
                	const temp = childrenFn(ite)
                    if (shouldGetParentNameArr) {
                        if (item.parentNameArr) {
                            temp.parentNameArr = JSON.parse(JSON.stringify(item.parentNameArr))
                            temp.parentNameArr.push(item.title)
                        } else {
                            temp.parentNameArr = [item.title]
                        }
                    }
                    if (selectedArray.length && selectedArray.indexOf(ite[selectJudgeName]) !== -1) {
                        temp.selected = true
                    }
                    item.children.push(temp)
                }
            })
        })
        resultArr.forEach(item => {
        	if (item.children.length) {
                const args = arguments[0]
                args.resultArr = item.children
                args.isChildren = true
                item = formatToTreeDataInner(args)
            } else {
                if (item.selected) {
                    item.checked = true
                }
            }
        })
        return resultArr
    }
}
/**
 * @description 编辑时，根据id获得 cascader的value数组值
 * @param array
 * @param label
 */
export const getCascaderSelectedValue = (array, label) => {
    let stack = []
    let going = true
    let walker = (array, label) => {
        array.forEach(item => {
            if (!going) return
            stack.push(item['value'])
            if (item['value'] === label) {
                going = false
            } else if (item['children']) {
                walker(item['children'], label)
            } else {
                stack.pop()
            }
        })
        if (going) stack.pop()
    }
    walker(array, label)
    return stack
}

export const handleMenus = (array) => {
    let parentArr = []
    const menusArr = array && array.filter((item) => {
	    return item.menuType !== 2
    })
    menusArr && menusArr.forEach(item => {
        if (item.parentMentId === '0' || item.parentMentId === 0 || item.parentMentId === '') {
            parentArr.push({
                ...item,
                children: []
            })
        }
    })
    parentArr.forEach(item => {
        menusArr.forEach(e => {
            if (item.menuId === e.parentMentId) {
                item.children.push(e)
            }
        })
    })
    return parentArr
}

/**
 * @description 防抖
 * @param func 被调用的方法
 * @param waitTime 延迟的时间ms
 */
export const debounce = (func, waitTime) => {
    return args => {
        clearTimeout(func.id)
        func.id = setTimeout(function () {
            func(args)
        }, waitTime)
    }
}

export const handleArray = (arr, checked) => {
    arr.forEach(item => {
        item.checked = checked
        if (item.children && item.children.length) {
            handleArray(item.children)
        }
    })
    return arr
}

export const formatToTreeData = formatToTreeDataInner

// 处理 当前页是最后一页，且只有最后一条数据，且pager-1不等于0时，需pager-1再查询
export const handleDeleteRefresh = (searchParams, tableParams, queryFunc, _this) => {
    const currentPage = _this[searchParams].pager
    const maxPage = Math.ceil(_this[tableParams].total / _this[searchParams].limit)
    if (currentPage !== 1 && currentPage === maxPage && _this[tableParams].data.length === 1) {
    	_this[searchParams].pager = currentPage - 1
    }
    _this[queryFunc]()
}
// format login 成功后的menu，使符合route格式
export const formatMenuToRouter = () => {
    if (!sessionStorage.getItem('rsysMenus')) {
        return []
    }
    // console.warn(JSON.parse(localStorage.getItem('rsysMenus')))
    const formatedMenuTree = formatToTreeDataInner({ baseArr: JSON.parse(sessionStorage.getItem('rsysMenus')),
        parentIdName: 'parentMentId',
        idName: 'id',
        sortName: 'menuSort',
        childrenFn: function (item) {
            return { title: item.menuName, expand: true, id: item.menuId, allData: JSON.parse(JSON.stringify(item)), menuSort: item.menuSort, children: [] }
        } })
    // console.log(formatedMenuTree)
    function formatToRouter (data, isFirstMenu = false) {
        const res = []
        data.forEach(item => {
            if (item.allData.menuType === 2) {
                return false
            }
            let menuUrl = item.allData.menuUrl
            let lastChat = menuUrl.lastIndexOf('/')
            menuUrl = menuUrl.substring(lastChat, menuUrl.length)
            let temp = {
                path: item.allData.menuUrl,
                name: menuUrl.substring(1, menuUrl.length),
                meta: { icon: item.allData.menuLogo || 'md-menu', title: item.allData.menuName }
            }
            if (isFirstMenu) {
                temp.children = formatToRouter(item.children)
                temp.component = Main
            } else {
                temp.component = () => import(`@/view${item.allData.menuUrl}.vue`)
            }
            if (item.allData.menuType === 1) {
                temp.meta.hideInMenu = true
            }
            res.push(temp)
        })
        return res
    }
    return formatToRouter(formatedMenuTree, true)
}
