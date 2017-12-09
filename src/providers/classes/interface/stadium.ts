export interface Stadium{
    nameStadium: string;
    address: string;
    phone: string;
}
export interface StadiumInterface{
    id: string;
    name: string;
    items: Array<Stadium>
}