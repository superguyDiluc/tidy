/*
    更新用户本地的token
    @params username: string, password: string
    @return Promise<boolean>
*/
export async function updateAccessToken (username: string, password: string): Promise<boolean> {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const response = await fetch('/api/user/token', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail}`);
        }
        const userData = await response.json();
        if ('access_token' in userData && 'token_type' in userData) {
            localStorage.setItem('access_token', userData['access_token']);
            localStorage.setItem('token_type', userData['token_type']);
        }
        else {
            throw new Error('Get UserData Fail');
        }
        return true;
    }
    catch (error: any) {
        console.error(error.message);
        return false;
    }
};

/*
    更新用户本地的userData
*/
export async function updateUserData() {
    try {
        const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        const response = await fetch('/api/user/by_token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail}`);
        }
        const userData = await response.json();
        localStorage.setItem('user_name', userData['user_name']);
        localStorage.setItem('real_name', userData['real_name']);
        localStorage.setItem('user_admin', userData['user_admin'] ? "管理员" : "用户");
        localStorage.setItem('user_id', (userData['user_id'] as number).toString());
        localStorage.setItem('user_photo_url', userData['user_photo_url']);
        return true;
    }
    catch (error: any) {
        console.error(error.message);
        return false;
    }
}

/*
    获取所有的work
*/
export async function fetchAllWork() {
    try {
        const response = await fetch('/api/work/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail}`);
        }

        const workData = await response.json();
        return workData as Array<{
            work_id: number;
            work_name: string;
        }>;
    }
    catch (error: any) {
        console.error(error.message);
    }
}

/*
    获取work的统计数据
*/
export async function fetchWorkStat(workID: number, maxnum: number) {
    try {
        const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        const params = new URLSearchParams({
            max_num: maxnum.toString(),
            work_id: workID.toString()
        });
        const response = await fetch(`/api/stat/least?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail}`);
        }

        const statData = await response.json();
        return statData as Array<{
            user_id: number;
            work_id: number;
            stat_complte: number;
            stat_update: number;
        }>;
    }
    catch (error: any) {
        console.error(error.message);
    }
}

/*
    获取用户的用户名
*/
export async function fetchUserName(userID: number) {
    try {
        const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        const response = await fetch(`/api/user/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail}`);
        }

        const userData = await response.json();
        return userData.user_name as string;
    }
    catch (error: any){
        console.error(error.message);
    }
}

/*
    获取指定日志
*/
export async function fetchLogData(maxnum: number, userID?: number, workID?: number) {
    try {
        const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        const params = new URLSearchParams({
            max_num: maxnum.toString(),
        });

        if (workID !== undefined) {
            params.append('work_id', workID.toString());
        }
        if (userID !== undefined) {
            params.append('user_id', userID.toString());
        }

        const response = await fetch(`/api/log/latest?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail || '无法添加任务'}`);
        }

        const logData = await response.json();
        console.log(logData);
        return logData as Array<{
            log_id: number;
            user_id: number;
            work_id: number;
            log_time: number;
        }>;
    }
    catch (error: any) {
        console.error(error.message);
    }
}

/*
    提交日志
*/
export async function postLog(workID: number) {
    try {
        const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        const response = await fetch('/api/log/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                work_id: workID
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.detail || '无法添加任务'}`);
        }

        const result = await response.json();
        return true;
    }
    catch (error: any) {
        console.error(error.message);
    }
}

/*
    判断当前是否处于登录状态
*/
export function checkLogin() {
    if (localStorage.getItem('access_token')) {
        return true;
    }
    else {
        return false
    }
};

/*
    删除用户本地的Token
*/
export function deleteAccessToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
}

/*
    计算毫秒级时间戳与当前时间的可视化差值
*/
export function calculateTimeDifference(timeStamp: number) {
    const date = new Date(timeStamp * 1000);
    const now = new Date();
    const timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const days = Math.floor(timeDifferenceInSeconds / 86400);
    const hours = Math.floor((timeDifferenceInSeconds % 86400) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;

    return { days, hours, minutes, seconds };
}

// 模拟异步
export async function testDelay(x: any) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(x); }, x);
    });
}