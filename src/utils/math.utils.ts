class MathUtil{
    static avarage(n1: number, n2: number): number{
        return this.sum(n1, n2)/2
    }

    static sum(n1: number, n2: number):number{
        return n1+n2
    }

    static abs(n: number): number{
        return n > 0 ? n : -n;
    }
}

export default MathUtil