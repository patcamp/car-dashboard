

export async function fetchAllData() {
    const response = await fetch("http://localhost:5000/allData");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch all data ');
    }

    return resData;
}

export async function fetchAllMake(){
    const response = await fetch("http://localhost:5000/makes");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch all data ');
    }

    return resData;
}