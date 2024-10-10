/*
    更新用户本地的token
    @params username: string, password: string
    @return Promise<boolean>
*/
export async function UpdateAccessToken (username: string, password: string): Promise<boolean> {
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