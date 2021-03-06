import React from 'react';
export default class StaffDetail extends React.Component {

	handlerEdit() {
		let item = {};
		let editTabel = this.refs.editTabel;
		let sex = editTabel.querySelector('#staffEditSex');
		let id = editTabel.querySelector('#staffEditId');

		item.name = editTabel.querySelector('#staffEditName').value.trim();
		item.age = editTabel.querySelector('#staffEditAge').value.trim();
		item.descrip = editTabel.querySelector('#staffEditDescrip').value.trim();
		item.sex = sex.options[sex.selectedIndex].value;
		item.id = id.options[id.selectedIndex].value;
		item.key = this.props.staffDetail.key;

		/*
		 *表单验证
		 */
		if (item.name == '' || item.age == '' || item.descrip == '') {
			let tips = this.refs.DtipsUnDone;
			tips.style.display = 'block';
			setTimeout(function () {
				tips.style.display = 'none';
			}, 1000);
			return;
		}
		//非负整数
		let numReg = /^\d+$/;
		if (!numReg.test(item.age) || parseInt(item.age) > 150) {
			let tips = this.refs.DtipsUnAge;
			tips.style.display = 'block';
			setTimeout(function () {
				tips.style.display = 'none';
			}, 1000);
			return;
		}

		this.props.editDetail(item);

		//此处应在返回修改成功信息后确认
		let tips = this.refs.Dtips;
		tips.style.display = 'block';
		setTimeout(function () {
			tips.style.display = 'none';
		}, 1000);
	}

	handlerClose() {
		this.props.closeDetail();
	}

	// 这个组件是初始化时渲染，当点击详情时，等于是更新。因此会调用这个生命周期函数。
	// 然后完成对dom组件的初始值调整。
	componentDidUpdate() {
		if (this.props.staffDetail == null) { }
		else {
			// let selSex = this.refs.selSex;
			// for (let i = 0; i < selSex.options.length; i++) {
			// 	if (selSex.options[i].value == this.props.staffDetail.info.sex) {
			// 		selSex.options[i].selected = 'selected';
			// 		break;
			// 	}
			// }
			let selId = this.refs.selId;
			for (let i = 0; i < selId.options.length; i++) {
				if (selId.options[i].value == this.props.staffDetail.info.id) {
					selId.options[i].selected = 'selected';
					break;
				}
			}

		}
	}

	render() {
		let staffDetail = this.props.staffDetail;
		if (!staffDetail) // 如果没有 staffDetail 属性，则什么都不渲染。就相当于 display:none
			return null;

		return (
			<div className="overLay">
				<h4 style={{ 'text-align': 'center' }}>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h4>
				<hr />
				<table ref="editTabel">
					<tbody>
						<tr>
							<th>姓名</th>
							<td><input id='staffEditName' type="text" defaultValue={staffDetail.info.name}></input></td>
						</tr>
						<tr>
							<th>年龄</th>
							<td><input id='staffEditAge' type="text" defaultValue={staffDetail.info.age}></input></td>
						</tr>
						<tr>
							<th>性别</th>
							<td>
								{/* 这里用 defaultValue={staffDetail.info.sex} 也可以实现默认值，省去上面的 ref 部分代码。 */}
								<select ref='selSex' id='staffEditSex' defaultValue={staffDetail.info.sex}>
									<option value="男">男</option>
									<option value="女">女</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>身份</th>
							<td>
								<select ref="selId" id='staffEditId'>
									<option value="主任">主任</option>
									<option value="老师">老师</option>
									<option value="学生">学生</option>
									<option value="实习">实习</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>个人描述</th>
							<td><textarea id='staffEditDescrip' type="text" defaultValue={staffDetail.info.descrip}></textarea></td>
						</tr>
					</tbody>
				</table>
				<p ref='Dtips' className='tips'>修改成功</p>
				<p ref='DtipsUnDone' className='tips'>请录入完整的人员信息</p>
				<p ref='DtipsUnAge' className='tips'>请录入正确的年龄</p>
				<button onClick={this.handlerEdit.bind(this)}>完成</button>
				<button onClick={this.handlerClose.bind(this)}>关闭</button>
			</div>
		);
	}
}